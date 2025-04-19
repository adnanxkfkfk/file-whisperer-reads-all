
import Layout from "@/components/Layout";
import { CreditCard, IndianRupee, QrCode } from "lucide-react";

const upiImage =
  "https://storage.googleapis.com/lovable-static-public/payments/upi-support.png";
const cardImage =
  "https://storage.googleapis.com/lovable-static-public/payments/cards-support.png";

const Payment = () => {
  return (
    <Layout>
      <section className="section-padding bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h2 className="section-title mb-2 text-center">Payment Options</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-xl text-center">
            Pay easily for your transportation and logistics services in Mumbai and Maharashtra.
            We support all major UPI apps and credit/debit cards for your convenience!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl w-full">
            {/* UPI Support */}
            <div className="shadow-lg rounded-lg bg-white flex flex-col items-center p-6 border border-gray-100">
              <QrCode className="text-accent mb-4" size={48} />
              <img
                src={upiImage}
                alt="UPI payment supported"
                className="w-36 h-20 object-contain mb-3"
              />
              <div className="text-base font-semibold mb-2">UPI Payments Supported</div>
              <div className="text-sm text-gray-500 text-center">Google Pay, PhonePe, Paytm, BHIM, and more</div>
            </div>
            {/* Card Support */}
            <div className="shadow-lg rounded-lg bg-white flex flex-col items-center p-6 border border-gray-100">
              <CreditCard className="text-transport-700 mb-4" size={48} />
              <img
                src={cardImage}
                alt="All cards supported"
                className="w-36 h-20 object-contain mb-3"
              />
              <div className="text-base font-semibold mb-2">Credit & Debit Cards Accepted</div>
              <div className="text-sm text-gray-500 text-center">Visa, Mastercard, RuPay, Maestro, and more</div>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-3 text-gray-600">
            <IndianRupee className="text-indigo-700" />
            <span className="font-medium">Secure & hassle-free payments with Farhan Transport Service, Mumbai</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
