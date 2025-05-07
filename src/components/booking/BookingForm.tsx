
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { VehicleTypeSelect } from "./VehicleTypeSelect";

// Define types for service types
type ServiceType = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
};

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  mobileNumber: z.string().min(10, {
    message: "Please enter a valid mobile number.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  serviceTypeId: z.string({
    required_error: "Please select a service type.",
  }),
  numPackages: z.coerce.number().min(1, {
    message: "Number of packages must be at least 1.",
  }),
  approximateWeight: z.coerce.number().optional(),
  vehicleType: z.string().optional(),
  pickupAddressLine1: z.string().min(5, {
    message: "Pickup address line 1 is required.",
  }),
  pickupAddressLine2: z.string().optional(),
  pickupPincode: z.string().min(6, {
    message: "Please enter a valid pickup pincode.",
  }),
  deliveryAddressLine1: z.string().min(5, {
    message: "Delivery address line 1 is required.",
  }),
  deliveryAddressLine2: z.string().optional(),
  deliveryPincode: z.string().min(6, {
    message: "Please enter a valid delivery pincode.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get service types with proper typing
  const { data: serviceTypes, isLoading: isLoadingServiceTypes } = useQuery({
    queryKey: ["serviceTypes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("service_types")
        .select("*");
      
      if (error) {
        console.error("Error fetching service types:", error);
        throw error;
      }
      return data as ServiceType[];
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      numPackages: 1,
      vehicleType: "",
      pickupAddressLine1: "",
      pickupAddressLine2: "",
      pickupPincode: "",
      deliveryAddressLine1: "",
      deliveryAddressLine2: "",
      deliveryPincode: "",
    },
  });

  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (serviceId && form && serviceTypes) {
      form.setValue("serviceTypeId", serviceId);
    }
  }, [searchParams, serviceTypes, form]);

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      let serviceTypeName = "Unknown";
      if (serviceTypes) {
        const selectedType = serviceTypes.find(t => t.id.toString() === data.serviceTypeId);
        serviceTypeName = selectedType?.name || data.serviceTypeId;
      }
      
      const bookingData = {
        name: data.fullName,
        number: data.mobileNumber,
        email: data.email,
        stype: serviceTypeName,
        np: data.numPackages.toString(),
        aw: data.approximateWeight || null,
        opin: data.pickupPincode,
        dpin: data.deliveryPincode,
        oa: data.pickupAddressLine1 + (data.pickupAddressLine2 ? `, ${data.pickupAddressLine2}` : ''),
        da: data.deliveryAddressLine1 + (data.deliveryAddressLine2 ? `, ${data.deliveryAddressLine2}` : ''),
        order_id: orderId,
        vtype: data.vehicleType || null
      };

      console.log("Sending booking data:", bookingData);

      const { data: result, error } = await supabase
        .from("bookings")
        .insert(bookingData)
        .select("*")
        .single();
      
      if (error) {
        console.error("Booking error:", error);
        toast({
          title: "Booking Failed",
          description: error.message || "There was an error processing your booking. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
      
      console.log("Booking successful:", result);
      toast({
        title: "Booking Successful",
        description: "Your service booking has been confirmed. Order ID: " + orderId,
      });
      
      form.reset();
      
      // Redirect to confirmation page after a short delay
      setTimeout(() => {
        navigate(`/track?order=${orderId}`);
      }, 2000);
      
    } catch (error: any) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingServiceTypes) {
    return (
      <div className="text-center py-10">
        <p>Loading service types...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter customer or consignor's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a valid mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a valid email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="serviceTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceTypes?.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <h2 className="text-xl font-semibold mb-4 pt-4">Package Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="numPackages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Packages *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter total number of packages" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="approximateWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approximate Weight (Kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter total weight in kilograms" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <VehicleTypeSelect form={form} />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 pt-4">Pickup Information</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="pickupAddressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address Line 1 *</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address, building, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pickupAddressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment, suite, unit, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pickupPincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Pincode *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pickup area pincode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 pt-4">Delivery Information</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="deliveryAddressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address Line 1 *</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address, building, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deliveryAddressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment, suite, unit, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deliveryPincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Pincode *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter delivery area pincode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-transport-900 hover:bg-transport-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book Now"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
