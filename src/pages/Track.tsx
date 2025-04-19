
import Layout from "@/components/Layout";
import { MapPin } from "lucide-react";

const Track = () => {
  return (
    <Layout>
      <section className="section-padding bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <MapPin size={64} className="text-transport-700 mb-4" />
          <h2 className="section-title mb-2 text-center">Track Your Shipment</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-xl text-center">
            Easily track your transportation orders with Farhan Transport Service, Mumbai's trusted logistics partner.
            Enter your tracking code (if available) to check your shipment status throughout Maharashtra and India.
          </p>
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Enter tracking code"
              className="w-full border rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
            />
            <button
              className="bg-transport-900 hover:bg-transport-800 text-white rounded px-6 py-3 font-medium w-full transition-colors"
            >
              Track Now
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Track;
