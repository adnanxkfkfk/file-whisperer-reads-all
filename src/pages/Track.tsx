
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Package, Truck, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackBooking, TrackingResponse } from "@/integrations/fts-api/client";
import { format, parseISO } from "date-fns";

const Track = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trackingCode, setTrackingCode] = useState(searchParams.get("order") || "");
  const orderId = searchParams.get("order");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["trackOrder", orderId],
    queryFn: async () => {
      if (!orderId) return null;
      return await trackBooking(orderId);
    },
    enabled: !!orderId,
  });

  const handleTrack = () => {
    if (trackingCode.trim()) {
      setSearchParams({ order: trackingCode.trim() });
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), "PPp"); // Format like "Apr 29, 2023, 1:30 PM"
    } catch (e) {
      return dateString;
    }
  };

  const renderTrackingDetails = (data: TrackingResponse) => {
    return (
      <div className="space-y-8 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-transport-900 mb-4">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-gray-500">Order ID</p>
              <p className="font-medium">{data.orderid}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">Customer Name</p>
              <p className="font-medium">{data.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">Mobile Number</p>
              <p className="font-medium">{data.mobile}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-transport-900 mb-4">Tracking Timeline</h3>
          
          {data.track.length === 0 ? (
            <p className="text-gray-600">No tracking information available yet.</p>
          ) : (
            <div className="relative">
              {data.track.map((item, index) => (
                <div key={index} className="flex mb-8 relative">
                  <div className="mr-4">
                    <div className="h-10 w-10 rounded-full bg-transport-100 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-transport-700" />
                    </div>
                    {index < data.track.length - 1 && (
                      <div className="h-full w-0.5 bg-transport-200 absolute left-5 top-10 ml-[0.35rem]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-transport-800">{item.status}</h4>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1" /> {formatDateTime(item.time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <section className="section-padding bg-gray-50 min-h-[70vh]">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col items-center">
            <MapPin size={64} className="text-transport-700 mb-4" />
            <h2 className="text-3xl font-bold mb-2 text-center">Track Your Shipment</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-xl text-center">
              Easily track your transportation orders with Farhan Transport Service, Mumbai's trusted logistics partner.
              Enter your tracking code to check your shipment status throughout Maharashtra and India.
            </p>
            <div className="w-full max-w-md flex flex-col space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter tracking code"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="flex-1 border rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-transport-400"
                />
                <Button
                  className="bg-transport-900 hover:bg-transport-800 text-white rounded px-6 py-3 font-medium transition-colors"
                  onClick={handleTrack}
                  disabled={isLoading}
                >
                  Track Now
                </Button>
              </div>

              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin h-8 w-8 border-2 border-transport-700 rounded-full border-t-transparent mx-auto"></div>
                  <p className="mt-2">Fetching tracking information...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
                  <p>Error: Could not find tracking information for this order ID.</p>
                </div>
              )}

              {!isLoading && !error && data && renderTrackingDetails(data)}
              
              {!isLoading && !error && orderId && !data && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md">
                  <p>No tracking information found for order ID: {orderId}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Track;
