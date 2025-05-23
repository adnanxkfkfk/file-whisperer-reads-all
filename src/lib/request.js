
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

// Simple in-memory response cache
const RESPONSE_CACHE = new Map();
const DEFAULT_CACHE_TIME = 60000; // 1 minute cache by default

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
 * Gets a cached response if valid
 * @param cacheKey The key to look up in cache
 * @returns The cached response or null if not found/expired
 */
const getCachedResponse = (cacheKey) => {
  if (!RESPONSE_CACHE.has(cacheKey)) return null;
  
  const { data, expiry } = RESPONSE_CACHE.get(cacheKey);
  if (expiry < Date.now()) {
    // Cache expired, remove it
    RESPONSE_CACHE.delete(cacheKey);
    return null;
  }
  
  return data;
};

/**
 * Sets a response in cache
 * @param cacheKey The key to store in cache
 * @param data The data to cache
 * @param duration How long to cache in ms (defaults to 1 minute)
 */
const setCachedResponse = (cacheKey, data, duration = DEFAULT_CACHE_TIME) => {
  RESPONSE_CACHE.set(cacheKey, {
    data,
    expiry: Date.now() + duration
  });
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
  const cacheKey = `${options.method || 'GET'}-${url}`;
  
  // Apply rate limiting if enabled (default is true)
  const shouldApplyRateLimit = customConfig.rateLimit !== false;
  const rateLimit = customConfig.rateLimit?.limit || DEFAULT_LIMIT;
  const timeWindow = customConfig.rateLimit?.timeWindow || DEFAULT_WINDOW;
  
  if (shouldApplyRateLimit && !checkRateLimit(endpoint, rateLimit, timeWindow)) {
    throw new Error("Rate limit exceeded");
  }
  
  // Check cache first if caching is enabled
  if (customConfig.useCache && options.method === 'GET') {
    const cachedData = getCachedResponse(cacheKey);
    if (cachedData) {
      console.log(`📦 Cache hit: ${options.method || 'GET'} ${url}`);
      return cachedData;
    }
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
  
  // Set request timeout
  const timeout = customConfig.timeout || 30000; // Default 30 seconds
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  secureOptions.signal = controller.signal;
  
  try {
    console.log(`🔄 API Request: ${options.method || 'GET'} ${url}`);
    const startTime = performance.now();
    const response = await fetch(url, secureOptions);
    clearTimeout(timeoutId);
    
    // Log performance metrics
    const endTime = performance.now();
    console.log(`⏱️ Request took: ${Math.round(endTime - startTime)}ms`);
    
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
    
    // Cache successful responses if caching is enabled
    const result = { data, response };
    if (customConfig.useCache && options.method === 'GET') {
      const cacheDuration = customConfig.cacheDuration || DEFAULT_CACHE_TIME;
      setCachedResponse(cacheKey, result, cacheDuration);
    }
    
    console.log(`✅ API Response: ${options.method || 'GET'} ${url}`, data);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      console.error(`Request timeout after ${timeout}ms:`, url);
      if (customConfig.suppressToasts !== true) {
        toast({
          title: "Request timeout",
          description: `The request took too long to complete`,
          variant: "destructive"
        });
      }
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    
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
