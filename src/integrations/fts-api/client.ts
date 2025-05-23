
// FTS API Client 

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
 * Create a new booking
 */
export async function createBooking(data: BookingRequest): Promise<BookingResponse> {
  try {
    const response = await fetch(`${FTS_API_BASE_URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Booking failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

/**
 * Track an existing booking by order ID
 */
export async function trackBooking(orderId: string): Promise<TrackingResponse> {
  try {
    const response = await fetch(`${FTS_API_BASE_URL}/track?orderid=${orderId}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Tracking failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error tracking booking:", error);
    throw error;
  }
}

/**
 * Validate pin code (postal code)
 */
export async function validatePinCode(pincode: string): Promise<boolean> {
  try {
    const response = await fetch(`${FTS_API_BASE_URL}/validate-pincode?pincode=${pincode}`);
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.valid === true;
  } catch (error) {
    console.error("Error validating pincode:", error);
    return false;
  }
}
