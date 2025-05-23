import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { TrackingSkeleton } from "@/components/tracking/TrackingSkeleton";
import { trackBooking } from "@/integrations/fts-api/client";

const formSchema = z.object({
  orderId: z.string().min(3, {
    message: "Order ID must be at least 3 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const TrackingPage = () => {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get("order") || "";
  const [currentOrderId, setCurrentOrderId] = useState(initialOrderId);

  // Optimize tracking query with better caching and performance settings
  const { data: trackingData, isLoading } = useQuery({
    queryKey: ["tracking", currentOrderId],
    queryFn: () => currentOrderId ? trackBooking(currentOrderId) : Promise.reject("No order ID"),
    enabled: !!currentOrderId,
    staleTime: 30000, // Cache for 30 seconds
    refetchOnWindowFocus: false,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderId: initialOrderId,
    },
    mode: "onChange",
  });

  // Track submission handler
  const handleTrackSubmit = (values: FormValues) => {
    setCurrentOrderId(values.orderId);
  };

  return (
    <Layout className="py-16">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-4">Track Your Shipment</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your order ID below to track the current status of your shipment and view estimated delivery times.
          </p>
        </div>

        {/* Track Form */}
        <div className="mb-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleTrackSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="orderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your order ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-transport-900 hover:bg-transport-800">
                Track
              </Button>
            </form>
          </Form>
        </div>

        {/* Tracking Results */}
        {currentOrderId && (
          <div className="mt-8">
            {isLoading ? (
              <TrackingSkeleton />
            ) : trackingData ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-gray-700 font-semibold">Order ID:</p>
                    <p className="text-gray-600">{trackingData.orderid}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">Name:</p>
                    <p className="text-gray-600">{trackingData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">Mobile:</p>
                    <p className="text-gray-600">{trackingData.mobile}</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">Tracking Status</h3>
                <div className="relative">
                  <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    {trackingData.track.map((item, index) => (
                      <li key={index} className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <Loader className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </span>
                        <div className="flex items-center justify-between mb-1 text-sm font-semibold leading-none text-gray-500 dark:text-gray-400">
                          <span>{item.status}</span>
                          <span className="text-gray-500">{item.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-500">{item.description || "No description available."}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600">No tracking data found for order ID: {currentOrderId}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrackingPage;
