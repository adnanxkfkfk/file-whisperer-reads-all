
// FTS API Client 
import { get, post } from "@/lib/request";

/**
 * Base URL for the FTS API
 */
export const FTS_API_BASE_URL = "https://fts-api.vercel.app";

/**
 * Service type options
 */
export type ServiceType = 
  | "road_transport" 
  | "air_freight" 
  | "warehouse" 
  | "packaging" 
  | "express_delivery";

/**
 * Vehicle type options
 */
export type VehicleType = 
  | "small_truck" 
  | "medium_truck" 
  | "large_truck" 
  | "container" 
  | "refrigerated";

/**
 * Interface for booking request payload
 */
export interface BookingRequest {
  name: string;
  mobile: string;
  email: string;
  service_type: ServiceType | string;
  number_of_packages: number;
  approximate_weight_kg?: string;
  vehicle_type?: VehicleType | string;
  pickup_address_line_1: string;
  pickup_address_line_2?: string;
  pickup_pincode: string;
  delivery_address_line_1: string;
  delivery_address_line_2?: string;
  delivery_pincode: string;
}

/**
 * Interface for booking response
 */
export interface BookingResponse {
  success: boolean;
  orderid: string;
}

/**
 * Status types for tracking
 */
export type TrackingStatus = 
  | "delivered" 
  | "in_transit" 
  | "processing" 
  | "received" 
  | "delayed" 
  | "exception";

/**
 * Interface for tracking status item
 */
export interface TrackingStatusItem {
  status: string;
  time: string;
  location?: string;
  description?: string;
}

/**
 * Interface for tracking response
 */
export interface TrackingResponse {
  orderid: string;
  name: string;
  mobile: string;
  email?: string;
  service_type?: ServiceType | string;
  status?: TrackingStatus | string;
  track: TrackingStatusItem[];
}

/**
 * Create a new booking with optimized request config
 */
export async function createBooking(data: BookingRequest): Promise<BookingResponse> {
  try {
    // Use a 10 second timeout for this important API call
    const response = await post(`${FTS_API_BASE_URL}/book`, data, {
      headers: {
        'Priority': 'high',  // Hint to the browser that this request is high priority
      }
    }, {
      // Apply custom rate limit settings
      rateLimit: {
        limit: 3,
        timeWindow: 60000 // 1 minute
      },
      // Improve performance by using a longer timeout for this critical operation
      timeout: 10000 // 10 seconds
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

/**
 * Track an existing booking by order ID with optimized configuration
 */
export async function trackBooking(orderId: string): Promise<TrackingResponse> {
  try {
    // Configure caching for tracking requests since they can be called frequently
    const response = await get(`${FTS_API_BASE_URL}/track?orderid=${orderId}`, {
      headers: {
        'Cache-Control': 'max-age=30', // Cache for 30 seconds
      }
    }, {
      // Cache successful responses
      useCache: true
    });
    return response.data;
  } catch (error) {
    console.error("Error tracking booking:", error);
    throw error;
  }
}

/**
 * Validate pin code (postal code) with optimized configuration
 * Uses a higher rate limit since this might be called often during form filling
 */
export async function validatePinCode(pincode: string): Promise<boolean> {
  try {
    const response = await get(`${FTS_API_BASE_URL}/validate-pincode?pincode=${pincode}`, {}, {
      // Configure higher rate limit for form validation
      rateLimit: {
        limit: 10,
        timeWindow: 60000 // 1 minute
      },
      useCache: true, // Cache responses for better performance
      timeout: 5000 // 5 second timeout for validation calls
    });
    return response.data.valid;
  } catch (error) {
    console.error("Error validating pincode:", error);
    return false;
  }
}
