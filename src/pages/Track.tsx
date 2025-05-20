
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Package, Truck, Clock, Search, CheckCircle, Calendar, ArrowRight, Info } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackBooking, TrackingResponse } from "@/integrations/fts-api/client";
import { format, parseISO } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

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
    meta: {
      onSuccess: () => {
        if (orderId && trackingCode) {
          toast({
            title: "Tracking information loaded",
            description: `Showing results for tracking ID: ${orderId}`,
          });
        }
      },
      onError: () => {
        toast({
          title: "Tracking failed",
          description: "We couldn't find information for this tracking code",
          variant: "destructive",
        });
      }
    },
  });

  const handleTrack = () => {
    if (trackingCode.trim()) {
      setSearchParams({ order: trackingCode.trim() });
    } else {
      toast({
        title: "Tracking code required",
        description: "Please enter a valid tracking code",
        variant: "destructive",
      });
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), "PPp"); // Format like "Apr 29, 2023, 1:30 PM"
    } catch (e) {
      return dateString;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

  const getStatusColor = (index: number) => {
    if (index === 0) return "bg-green-500 text-white";
    if (index === 1) return "bg-blue-500 text-white";
    return "bg-transport-700 text-white";
  };

  const renderTrackingDetails = (data: TrackingResponse) => {
    return (
      <div className="space-y-8 mt-6 animate-fade-in">
        <Card className="overflow-hidden border-transport-200 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-transport-100 to-transport-50 border-b border-transport-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-xl font-bold text-transport-900">
                Order Details
                <Badge variant="secondary" className="ml-3 font-normal">
                  {data.track.length > 0 ? "Active" : "Pending"}
                </Badge>
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs flex items-center gap-1 hover:bg-transport-100"
                onClick={() => refetch()}
              >
                <Clock className="h-3 w-3" />
                Refresh Status
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-transport-50 border border-transport-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-5 w-5 text-transport-700" />
                  <p className="text-gray-500 font-medium">Order ID</p>
                </div>
                <p className="font-bold text-transport-900 text-lg">{data.orderid}</p>
              </div>
              <div className="p-4 rounded-lg bg-transport-50 border border-transport-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-transport-700" />
                  <p className="text-gray-500 font-medium">Customer</p>
                </div>
                <p className="font-bold text-transport-900 text-lg">{data.name}</p>
              </div>
              <div className="p-4 rounded-lg bg-transport-50 border border-transport-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-transport-700" />
                  <p className="text-gray-500 font-medium">Contact</p>
                </div>
                <p className="font-bold text-transport-900 text-lg">{data.mobile}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-transport-200 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-transport-100 to-transport-50 border-b border-transport-200">
            <CardTitle className="text-xl font-bold text-transport-900">Tracking Timeline</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {data.track.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="bg-transport-100/50 p-6 rounded-full mb-4">
                  <Package className="h-12 w-12 text-transport-600" />
                </div>
                <p className="text-lg font-semibold text-transport-800 mb-2">No tracking information available yet.</p>
                <p className="text-sm text-gray-500 max-w-md">Your order has been received and will be processed soon. Check back later for updates on your shipment.</p>
              </div>
            ) : (
              <div className="relative">
                {data.track.map((item, index) => (
                  <div key={index} className="flex mb-8 relative group">
                    <div className="mr-4">
                      <div className={`h-10 w-10 rounded-full ${getStatusColor(index)} flex items-center justify-center border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        {index === 0 ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Truck className="h-5 w-5" />
                        )}
                      </div>
                      {index < data.track.length - 1 && (
                        <div className="h-full w-0.5 bg-transport-200 absolute left-5 top-10 ml-[0.35rem]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-5 rounded-lg border border-transport-100 group-hover:border-transport-300 transition-all duration-300 shadow-sm group-hover:shadow-md">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                          <h4 className="font-semibold text-transport-800 text-lg">{item.status}</h4>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDateTime(item.time)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <ArrowRight className="h-4 w-4 text-transport-600" />
                          <p className="text-sm text-gray-600">
                            {index === 0 
                              ? "Current status of your shipment" 
                              : index === data.track.length - 1 
                                ? "Order received" 
                                : `Step ${data.track.length - index} of ${data.track.length}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Layout>
      <section className="section-padding bg-gradient-to-b from-transport-100 to-transport-50 min-h-[80vh]">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-transport-700 flex items-center justify-center mb-6 animate-float">
              <MapPin size={36} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-transport-900">Track Your Shipment</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl text-center">
              Easily track your transportation orders with Farhan Transport Service, Mumbai's trusted logistics partner.
              Enter your tracking code to check your shipment status throughout Maharashtra and India.
            </p>
            <Card className="w-full max-w-lg shadow-lg border-transport-200 overflow-hidden animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-transport-100 to-transport-50 border-b border-transport-200 pb-4">
                <CardTitle className="text-xl text-center text-transport-900">Enter Tracking Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2">
                    <Input
                      type="text"
                      placeholder="Enter your tracking code"
                      value={trackingCode}
                      onChange={(e) => setTrackingCode(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 border rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-transport-400"
                    />
                    <Button
                      className="bg-transport-900 hover:bg-transport-800 text-white rounded px-6 py-3 font-medium transition-colors flex items-center justify-center"
                      onClick={handleTrack}
                      disabled={isLoading}
                    >
                      {isLoading ? "Searching..." : "Track Now"}
                      <Search className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {isLoading && (
                    <div className="text-center py-8">
                      <div className="animate-spin h-8 w-8 border-3 border-transport-700 rounded-full border-t-transparent mx-auto"></div>
                      <p className="mt-4 text-transport-700">Fetching tracking information...</p>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md mt-4 flex items-start">
                      <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Error: Could not find tracking information for this order ID.</p>
                        <p className="text-sm mt-1">Please verify the tracking code and try again.</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {!isLoading && !error && data && renderTrackingDetails(data)}
            
            {!isLoading && !error && orderId && !data && (
              <div className="w-full max-w-lg bg-yellow-50 border border-yellow-200 text-yellow-800 p-6 rounded-md mt-6 animate-fade-in flex items-start">
                <Info className="h-6 w-6 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-lg">No tracking information found</p>
                  <p className="mt-2">We couldn't find any tracking details for order ID: {orderId}</p>
                  <p className="mt-1 text-sm">Please verify the tracking code and try again, or contact our support team for assistance.</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4 border-yellow-300 hover:bg-yellow-100 text-yellow-800"
                    onClick={() => setTrackingCode("")}
                  >
                    Try Another Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Track;
