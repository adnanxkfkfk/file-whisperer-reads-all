
import Layout from "@/components/Layout";
import { CreditCard, Banknote, MessageCircle } from "lucide-react";

// Images for payment support
const upiImage = "/lovable-uploads/upi-sample.png";
const cardImage = "/lovable-uploads/card-sample.png";

const Payment = () => {
  const handleCashOption = () => {
    window.open('https://wa.me/918097801972', '_blank');
  };

  return (
    <Layout>
      <section className="section-padding bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h2 className="section-title mb-2 text-center">Payment Options</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-xl text-center">
            Choose your preferred payment method for our transportation services<br />
            <span className="font-semibold">We accept online payments and cash on delivery!</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl w-full">
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
                onClick={() => alert('Redirecting to payment gateway...')} 
                className="mt-4 px-6 py-2 bg-transport-700 text-white rounded-md hover:bg-transport-800 transition-colors"
              >
                Pay Online
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
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
