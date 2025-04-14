import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import OtpVerification from "./OtpVerification";

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
  originPincode: z.string().min(6, {
    message: "Please enter a valid origin pincode.",
  }),
  destinationPincode: z.string().min(6, {
    message: "Please enter a valid destination pincode.",
  }),
  pickupDate: z.date({
    required_error: "Please select a pickup date.",
  }),
  addressLine1: z.string().min(5, {
    message: "Address line 1 is required.",
  }),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const [showVerification, setShowVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  // Get service types
  const { data: serviceTypes } = useQuery({
    queryKey: ["serviceTypes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("service_types").select("*");
      if (error) throw error;
      return data;
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      numPackages: 1,
      originPincode: "",
      destinationPincode: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
    },
  });

  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (serviceId && form && serviceTypes) {
      form.setValue("serviceTypeId", serviceId);
    }
  }, [searchParams, serviceTypes, form]);

  const createBooking = useMutation({
    mutationFn: async (data: FormValues) => {
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      const bookingData = {
        name: data.fullName,
        number: data.mobileNumber,
        email: data.email,
        stype: serviceTypes?.find(t => t.id.toString() === data.serviceTypeId)?.name || data.serviceTypeId,
        np: data.numPackages.toString(),
        aw: data.approximateWeight || null,
        opin: data.originPincode,
        dpin: data.destinationPincode,
        oa: data.addressLine1,
        da: `${data.addressLine2 || ''} ${data.addressLine3 || ''}`.trim(),
        order_id: orderId,
      };

      const { data: result, error } = await supabase
        .from("bookings")
        .insert(bookingData)
        .select();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Booking Successful",
        description: "Your service booking has been confirmed.",
      });
      form.reset();
      setIsVerified(false);
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!isVerified) {
      toast({
        title: "Mobile Verification Required",
        description: "Please verify your mobile number before proceeding.",
        variant: "destructive",
      });
      setShowVerification(true);
      return;
    }
    
    createBooking.mutate(data);
  };

  const handleVerifyClick = () => {
    const mobileNumber = form.getValues("mobileNumber");
    if (!mobileNumber || mobileNumber.length < 10) {
      form.setError("mobileNumber", { 
        message: "Please enter a valid mobile number before verification" 
      });
      return;
    }
    setShowVerification(true);
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    setShowVerification(false);
    toast({
      title: "Verification Successful",
      description: "Your mobile number has been verified.",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="sm:max-w-md">
          <OtpVerification 
            phoneNumber={form.getValues("mobileNumber")}
            onVerificationSuccess={handleVerificationSuccess}
            onCancel={() => setShowVerification(false)}
          />
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            
            <div className="flex items-end space-x-2">
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Mobile Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a valid mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={handleVerifyClick}
                className={`mb-0.5 ${isVerified ? "bg-green-600 hover:bg-green-700" : ""}`}
                disabled={isVerified}
              >
                {isVerified ? "Verified" : "Verify"}
              </Button>
            </div>
            
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
          
          <h2 className="text-xl font-semibold mb-4 pt-4">Pickup & Delivery Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="originPincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origin Pincode *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter origin area pincode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="destinationPincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Pincode *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter destination area pincode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Pickup Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 pt-4">Address Details</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1 *</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address, building, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment, suite, unit, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="addressLine3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 3</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Landmark or additional directions" className="resize-none" {...field} />
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
              disabled={createBooking.isPending}
            >
              {createBooking.isPending ? "Submitting..." : "Book Now"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
