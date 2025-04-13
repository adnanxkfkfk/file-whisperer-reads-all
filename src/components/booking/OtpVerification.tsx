
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

interface OtpVerificationProps {
  phoneNumber: string;
  onVerificationSuccess: () => void;
  onCancel: () => void;
}

const OtpVerification = ({ phoneNumber, onVerificationSuccess, onCancel }: OtpVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();

  // Simpler base64url encoding/decoding
  const base64UrlEncode = (str: string): string => {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const base64UrlDecode = (str: string): string => {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
      str += '=';
    }
    return atob(str);
  };

  // Simple encryption for compatibility with the PHP implementation
  const simpleEncrypt = (data: any): string => {
    // This is a placeholder that creates base64-encoded JSON
    // to match the expected format by the server
    return base64UrlEncode(JSON.stringify(data));
  };

  const sendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please provide a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    setSendingOtp(true);

    try {
      // Use simpler encryption approach that's compatible with the PHP endpoint
      const payload = {
        data: simpleEncrypt({ phone: phoneNumber })
      };

      console.log("Sending OTP request with payload:", payload);
      
      // Add CORS headers to the request
      const response = await fetch("https://aqualemur.onpella.app/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": window.location.origin,
        },
        body: JSON.stringify(payload),
      });

      console.log("OTP response status:", response.status);
      
      if (response.ok) {
        toast({
          title: "OTP Sent",
          description: "A verification code has been sent to your mobile number.",
        });
        setOtpSent(true);
      } else {
        const errorText = await response.text();
        console.error("OTP API error response:", errorText);
        
        toast({
          title: "Failed to Send OTP",
          description: "There was an issue sending the verification code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      
      // In development, allow proceeding even if OTP service is unavailable
      if (import.meta.env.DEV) {
        toast({
          title: "Development Mode",
          description: "Proceeding without OTP in development mode.",
        });
        setOtpSent(true);
      } else {
        toast({
          title: "Error",
          description: "Network error connecting to verification service. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete verification code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // In development, allow any OTP
      if (import.meta.env.DEV) {
        toast({
          title: "Development Mode",
          description: "OTP verified in development mode.",
        });
        onVerificationSuccess();
        return;
      }
      
      const payload = {
        data: simpleEncrypt({ phone: phoneNumber, otp })
      };

      console.log("Sending verification request with payload:", payload);
      
      const response = await fetch("https://aqualemur.onpella.app/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": window.location.origin,
        },
        body: JSON.stringify(payload),
      });

      console.log("Verification response status:", response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log("Verification response:", result);
        
        if (result && result.success === true) {
          toast({
            title: "Phone Verified",
            description: "Your phone number has been successfully verified.",
          });
          onVerificationSuccess();
        } else {
          toast({
            title: "Verification Failed",
            description: "The code you entered is incorrect. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        const errorText = await response.text();
        console.error("Verification API error response:", errorText);
        
        toast({
          title: "Verification Failed",
          description: "There was an issue verifying your code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Error",
        description: "Network error connecting to verification service. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      <h2 className="text-2xl font-bold text-center">Phone Verification</h2>
      
      <div className="text-center">
        <p>We need to verify your phone number:</p>
        <p className="font-semibold mt-2">{phoneNumber}</p>
      </div>
      
      {!otpSent ? (
        <Button 
          onClick={sendOtp} 
          disabled={sendingOtp}
          className="w-full max-w-xs bg-transport-900 hover:bg-transport-800"
        >
          {sendingOtp ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : "Send Verification Code"}
        </Button>
      ) : (
        <div className="w-full max-w-xs space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium">Enter verification code</label>
            <InputOTP 
              maxLength={6}
              value={otp} 
              onChange={setOtp}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} index={index} {...slot} />
                  ))}
                </InputOTPGroup>
              )}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={onCancel}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={verifyOtp} 
              disabled={loading || otp.length < 4}
              className="flex-1 bg-transport-900 hover:bg-transport-800"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Verify
                </>
              )}
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={sendOtp}
            disabled={sendingOtp}
            className="w-full text-sm"
          >
            {sendingOtp ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : "Resend Code"}
          </Button>
          
          {import.meta.env.DEV && (
            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-center text-amber-700 text-sm">
                <AlertCircle className="h-4 w-4 mr-2" />
                <p>Development mode: OTP verification will be bypassed</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
