
/**
 * Centralized API request handler
 * All API requests should go through this file for consistent handling,
 * error management, and security implementation
 */

import { toast } from "@/hooks/use-toast";

// Rate limiting cache
const API_RATE_LIMITS = {};
const DEFAULT_LIMIT = 5; // Default requests per minute
const DEFAULT_WINDOW = 60000; // 1 minute in ms

/**
 * Checks if a request is allowed based on rate limiting rules
 * @param endpoint Unique identifier for the API endpoint
 * @param limit Maximum number of requests in the time window
 * @param timeWindow Time window in milliseconds
 * @returns Whether the request should proceed
 */
const checkRateLimit = (endpoint, limit = DEFAULT_LIMIT, timeWindow = DEFAULT_WINDOW) => {
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
 * Main request function for all API calls
 * @param url The URL to fetch from
 * @param options Fetch options (method, headers, body, etc.)
 * @param customConfig Additional configuration (rate limits, error handling)
 * @returns Promise with the response
 */
export const request = async (url, options = {}, customConfig = {}) => {
  // Generate a unique key for this endpoint for rate limiting
  const endpoint = `${options.method || 'GET'}-${url.split('?')[0]}`;
  
  // Apply rate limiting if enabled (default is true)
  const shouldApplyRateLimit = customConfig.rateLimit !== false;
  const rateLimit = customConfig.rateLimit?.limit || DEFAULT_LIMIT;
  const timeWindow = customConfig.rateLimit?.timeWindow || DEFAULT_WINDOW;
  
  if (shouldApplyRateLimit && !checkRateLimit(endpoint, rateLimit, timeWindow)) {
    throw new Error("Rate limit exceeded");
  }
  
  // Add security headers
  const secureOptions = {
    ...options,
    headers: {
      ...options.headers,
      'X-Requested-With': 'XMLHttpRequest',
    },
    credentials: 'same-origin',
  };
  
  try {
    console.log(`🔄 API Request: ${options.method || 'GET'} ${url}`);
    const response = await fetch(url, secureOptions);
    
    // Handle common HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || `Error: ${response.status} ${response.statusText}`;
      
      if (customConfig.suppressToasts !== true) {
        toast({
          title: "Request failed",
          description: errorMessage,
          variant: "destructive"
        });
      }
      
      throw new Error(errorMessage);
    }
    
    // Parse response based on content type
    const contentType = response.headers.get("content-type");
    let data;
    
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    console.log(`✅ API Response: ${options.method || 'GET'} ${url}`, data);
    return { data, response };
  } catch (error) {
    console.error("API request failed:", error);
    
    if (customConfig.suppressToasts !== true) {
      toast({
        title: "Request error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    throw error;
  }
};

/**
 * Convenience method for GET requests
 */
export const get = (url, options = {}, customConfig = {}) => {
  return request(url, { ...options, method: 'GET' }, customConfig);
};

/**
 * Convenience method for POST requests
 */
export const post = (url, data, options = {}, customConfig = {}) => {
  return request(
    url, 
    { 
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    }, 
    customConfig
  );
};

/**
 * Convenience method for PUT requests
 */
export const put = (url, data, options = {}, customConfig = {}) => {
  return request(
    url, 
    { 
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
    }, 
    customConfig
  );
};

/**
 * Convenience method for DELETE requests
 */
export const del = (url, options = {}, customConfig = {}) => {
  return request(url, { ...options, method: 'DELETE' }, customConfig);
};

export default {
  request,
  get,
  post,
  put,
  delete: del
};
