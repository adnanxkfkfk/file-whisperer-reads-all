
// payment/index.ts - Edge Function for Razorpay integration
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Response helper with CORS
const response = (status: number, body: any) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
};

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  return null;
};

// Initialize the Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Razorpay API key from environment
const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID") || "";
const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET") || "";

// Create Razorpay order
async function createRazorpayOrder(bookingId: string, amount: number) {
  const url = "https://api.razorpay.com/v1/orders";
  const authString = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${authString}`,
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paise
        currency: "INR",
        receipt: bookingId,
        notes: {
          bookingId: bookingId,
        },
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
}

// Verify Razorpay payment
async function verifyPayment(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string) {
  // Create a string for HMAC generation
  const hmacData = razorpayOrderId + "|" + razorpayPaymentId;
  
  // Using crypto to create HMAC
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(razorpayKeySecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(hmacData)
  );
  
  // Convert signature to hex
  const hexSignature = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  // Compare with the signature received from Razorpay
  return hexSignature === razorpaySignature;
}

// Main handler
serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;
  
  const url = new URL(req.url);
  const pathname = url.pathname;
  
  try {
    // Create payment order
    if (pathname.includes("/create-order") && req.method === "POST") {
      const { bookingId } = await req.json();
      
      if (!bookingId) {
        return response(400, { status: "error", message: "Missing bookingId" });
      }
      
      // Fetch booking from database
      const { data: booking, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("order_id", bookingId)
        .single();
      
      if (error || !booking) {
        return response(404, { status: "error", message: "Booking not found" });
      }
      
      // Use booking amount or default to 100 INR if not set
      const amount = booking.amount || 100;
      
      // Create order with Razorpay
      const order = await createRazorpayOrder(bookingId, amount);
      
      if (!order || order.error) {
        return response(500, { 
          status: "error", 
          message: order.error?.description || "Failed to create payment order" 
        });
      }
      
      // Update booking with order ID
      await supabase
        .from("bookings")
        .update({ payment_order_id: order.id })
        .eq("order_id", bookingId);
      
      return response(200, {
        status: "success",
        orderId: order.id,
        amount: order.amount / 100,
        currency: order.currency,
        keyId: razorpayKeyId
      });
    }
    
    // Verify payment
    else if (pathname.includes("/verify-payment") && req.method === "POST") {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = await req.json();
      
      if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !bookingId) {
        return response(400, { status: "error", message: "Missing required parameters" });
      }
      
      // Verify the signature
      const isValid = await verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);
      
      if (!isValid) {
        return response(400, { status: "error", message: "Invalid payment signature" });
      }
      
      // Update booking status
      await supabase
        .from("bookings")
        .update({ 
          paid: true, 
          payment_id: razorpayPaymentId 
        })
        .eq("order_id", bookingId);
      
      return response(200, { status: "success", message: "Payment verified successfully" });
    }
    
    // Return 404 for any other route
    return response(404, { status: "error", message: "Route not found" });
    
  } catch (error) {
    console.error("Error in payment function:", error);
    return response(500, { status: "error", message: error.message });
  }
});
