import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { CreditCard, Banknote, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Images for payment support
const upiImage = "/lovable-uploads/upi-sample.png";
const cardImage = "/lovable-uploads/card-sample.png";

interface LoadScriptProps {
  src: string;
  onLoad?: () => void;
}

function loadScript({ src, onLoad }: LoadScriptProps): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      if (onLoad) onLoad();
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Get booking ID from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    if (id) {
      setBookingId(id);
    }
  }, [location]);

  // Load Razorpay script
  useEffect(() => {
    loadScript({ 
      src: "https://checkout.razorpay.com/v1/checkout.js",
      onLoad: () => setScriptLoaded(true)
    });
  }, []);

  const handleCashOption = () => {
    window.open('https://wa.me/918097801972', '_blank');
  };

  const handleOnlinePayment = useCallback(async () => {
    if (!bookingId) {
      toast({
        title: "No booking found",
        description: "Please create a booking first",
        variant: "destructive",
      });
      navigate("/booking");
      return;
    }

    try {
      setLoading(true);
      
      // Get order details from our edge function
      const response = await supabase.functions.invoke("payment", {
        body: { 
          bookingId,
          action: "create-order" 
        },
        method: "POST",
        function: "create-order",
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to create payment order");
      }

      const { orderId, amount, currency, keyId } = response.data;

      if (!orderId || !keyId) {
        throw new Error("Invalid response from server");
      }

      // Open Razorpay checkout
      const options = {
        key: keyId,
        amount: amount * 100, // Amount in paisa
        currency: currency || "INR",
        name: "Farhan Transport",
        description: "Transport Service Payment",
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Verify payment with our edge function
            const verificationResponse = await supabase.functions.invoke("payment", {
              body: {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                bookingId: bookingId,
              },
              method: "POST",
              function: "verify-payment",
            });

            if (verificationResponse.error) {
              throw new Error(verificationResponse.error.message || "Payment verification failed");
            }

            // Show success message
            toast({
              title: "Payment Successful",
              description: "Your payment has been processed successfully",
            });

            // Redirect to a success page or booking details
            navigate(`/track?bookingId=${bookingId}`);
          } catch (error) {
            console.error("Payment verification error:", error);
            toast({
              title: "Verification Failed",
              description: error.message || "Payment verification failed. Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          },
        },
      };

      // Open Razorpay checkout
      if (window.Razorpay && scriptLoaded) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        throw new Error("Razorpay SDK failed to load");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "An error occurred while processing your payment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [bookingId, navigate, scriptLoaded]);

  return (
    <Layout>
      <section className="section-padding bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h2 className="section-title mb-2 text-center">Payment Options</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-xl text-center">
            Choose your preferred payment method for our transportation services<br />
            <span className="font-semibold">We accept online payments and cash on delivery!</span>
          </p>
          {bookingId && (
            <div className="bg-blue-50 px-4 py-2 rounded-md mb-6 border border-blue-100">
              <p className="text-sm text-blue-800">Booking ID: <span className="font-semibold">{bookingId}</span></p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl w-full">
            {/* UPI/Card Support */}
            <div className="shadow-lg rounded-lg bg-white flex flex-col items-center p-6 border border-gray-100">
              <CreditCard className="text-transport-700 mb-4" size={48} />
              <img
                src={upiImage}
                alt="UPI payment supported"
                className="w-36 h-20 object-contain mb-3 rounded-lg bg-white border"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "public/logo.png"; }}
              />
              <div className="text-base font-semibold mb-2">Online Payment</div>
              <div className="text-sm text-gray-500 text-center">UPI, Credit & Debit Cards</div>
              <button 
                onClick={handleOnlinePayment} 
                disabled={loading}
                className="mt-4 px-6 py-2 bg-transport-700 text-white rounded-md hover:bg-transport-800 transition-colors flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <CreditCard size={18} />}
                {loading ? "Processing..." : "Pay Online"}
              </button>
            </div>

            {/* Cash Option */}
            <div className="shadow-lg rounded-lg bg-white flex flex-col items-center p-6 border border-gray-100">
              <Banknote className="text-green-600 mb-4" size={48} />
              <div className="w-36 h-20 flex items-center justify-center mb-3">
                <MessageCircle className="text-green-500" size={40} />
              </div>
              <div className="text-base font-semibold mb-2">Cash Payment</div>
              <div className="text-sm text-gray-500 text-center">Pay cash on delivery</div>
              <button 
                onClick={handleCashOption}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <MessageCircle size={20} />
                Contact on WhatsApp
              </button>
            </div>
          </div>
          {!bookingId && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-2">No active booking found. Create a booking first to proceed with payment.</p>
              <button 
                onClick={() => navigate("/booking")} 
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Go to Booking
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
