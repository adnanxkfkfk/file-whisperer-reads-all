
// FTS API Client 

/**
 * Base URL for the FTS API
 */
export const FTS_API_BASE_URL = "https://fts-api.vercel.app";

/**
 * Interface for booking request payload
 */
export interface BookingRequest {
  name: string;
  mobile: string;
  email: string;
  service_type: string;
  number_of_packages: number;
  approximate_weight_kg?: string;
  vehicle_type?: string;
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
 * Interface for tracking status item
 */
export interface TrackingStatusItem {
  status: string;
  time: string;
}

/**
 * Interface for tracking response
 */
export interface TrackingResponse {
  orderid: string;
  name: string;
  mobile: string;
  track: TrackingStatusItem[];
}

/**
 * Create a new booking
 */
export async function createBooking(data: BookingRequest): Promise<BookingResponse> {
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

  return response.json();
}

/**
 * Track an existing booking by order ID
 */
export async function trackBooking(orderId: string): Promise<TrackingResponse> {
  const response = await fetch(`${FTS_API_BASE_URL}/track?orderid=${orderId}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Tracking failed: ${response.status} - ${errorText}`);
  }

  return response.json();
}
