
import { toast } from "@/hooks/use-toast";

// Rate limiting cache
interface RateLimitCache {
  [endpoint: string]: {
    count: number;
    resetTime: number;
  };
}

const API_RATE_LIMITS: RateLimitCache = {};
const DEFAULT_LIMIT = 5; // Default requests per minute
const DEFAULT_WINDOW = 60000; // 1 minute in ms

/**
 * Checks if a request is allowed based on rate limiting rules
 * @param endpoint Unique identifier for the API endpoint
 * @param limit Maximum number of requests in the time window
 * @param timeWindow Time window in milliseconds
 * @returns Whether the request should proceed
 */
export const checkRateLimit = (endpoint: string, limit = DEFAULT_LIMIT, timeWindow = DEFAULT_WINDOW): boolean => {
  const now = Date.now();
  
  // Initialize or reset expired entries
  if (!API_RATE_LIMITS[endpoint] || API_RATE_LIMITS[endpoint].resetTime < now) {
    API_RATE_LIMITS[endpoint] = {
      count: 1,
      resetTime: now + timeWindow
    };
    return true;
  }
  
  // Check if limit exceeded
  if (API_RATE_LIMITS[endpoint].count >= limit) {
    const waitSeconds = Math.ceil((API_RATE_LIMITS[endpoint].resetTime - now) / 1000);
    toast({
      title: "Too many requests",
      description: `Please wait ${waitSeconds} seconds before trying again.`,
      variant: "destructive"
    });
    return false;
  }
  
  // Increment counter and allow request
  API_RATE_LIMITS[endpoint].count += 1;
  return true;
};

/**
 * Wrapper for fetch with additional security and error handling
 */
export const secureFetch = async (url: string, options: RequestInit = {}) => {
  // Generate a unique key for this endpoint
  const endpoint = `${options.method || 'GET'}-${url.split('?')[0]}`;
  
  // Check rate limiting
  if (!checkRateLimit(endpoint)) {
    throw new Error("Rate limit exceeded");
  }
  
  // Add security headers
  const secureOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      'X-Requested-With': 'XMLHttpRequest',
    },
    credentials: 'same-origin',
  };
  
  try {
    const response = await fetch(url, secureOptions);
    
    // Handle common HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || `Error: ${response.status} ${response.statusText}`;
      
      toast({
        title: "Request failed",
        description: errorMessage,
        variant: "destructive"
      });
      
      throw new Error(errorMessage);
    }
    
    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
