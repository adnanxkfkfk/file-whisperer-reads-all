
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Loader2, CheckCircle2, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { secureFetch, checkRateLimit } from "@/lib/api-protection";

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
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let timer: number | undefined;
    
    if (countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.startsWith('91') ? cleaned : `91${cleaned}`;
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

    // Check for rate limiting
    if (!checkRateLimit("send-otp", 3, 60000)) {
      return;
    }

    setSendingOtp(true);
    setVerificationError(null); // Clear any previous errors

    try {
      const formattedPhone = formatPhone(phoneNumber);
      
      console.log("Sending OTP request with phone:", formattedPhone);
      
      const response = await secureFetch("https://aqualemur.onpella.app/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ phone: formattedPhone }),
      });

      console.log("OTP response status:", response.status);
      
      const result = await response.json();
      console.log("OTP API response:", result);
      
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your WhatsApp number.",
      });
      setOtpSent(true);
      setCountdown(30); // Set countdown for resend button
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Error",
        description: "Network error connecting to verification service. Please try again later.",
        variant: "destructive",
      });
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
    setVerificationError(null); // Clear previous errors

    try {
      const formattedPhone = formatPhone(phoneNumber);
      
      console.log("Sending verification request with data:", { phone: formattedPhone, otp });
      
      const response = await secureFetch("https://aqualemur.onpella.app/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ phone: formattedPhone, otp }),
      });

      console.log("Verification response status:", response.status);
      
      const result = await response.json();
      console.log("Verification API response:", result);
      
      if (result && result.verified === true) {
        toast({
          title: "Phone Verified",
          description: "Your phone number has been successfully verified.",
          variant: "success",
        });
        onVerificationSuccess();
      } else {
        setVerificationError(result.error || "Verification failed. Please try again.");
        toast({
          title: "Verification Failed",
          description: result.error || "The code you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setVerificationError("Network error. Please try again later.");
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
    <div className="flex flex-col items-center justify-center space-y-6 p-4 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Zap className="h-6 w-6 text-transport-900" />
        <h2 className="text-2xl font-bold text-center">WhatsApp Verification</h2>
      </div>
      
      <div className="text-center bg-transport-50 p-4 rounded-lg border border-transport-100">
        <p className="text-transport-700">We need to verify your WhatsApp number:</p>
        <p className="font-semibold mt-2 text-transport-900">{phoneNumber}</p>
      </div>
      
      {verificationError && (
        <Alert variant="destructive" className="w-full max-w-xs">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>{verificationError}</AlertDescription>
        </Alert>
      )}
      
      {!otpSent ? (
        <Button 
          onClick={sendOtp} 
          disabled={sendingOtp}
          className="w-full max-w-xs bg-transport-900 hover:bg-transport-800 transition-all shadow-md"
        >
          {sendingOtp ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : "Send WhatsApp Code"}
        </Button>
      ) : (
        <div className="w-full max-w-xs space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <label className="text-sm font-medium text-transport-800">Enter verification code from WhatsApp</label>
            <InputOTP 
              maxLength={6}
              value={otp} 
              onChange={setOtp}
              render={({ slots }) => (
                <InputOTPGroup className="gap-2">
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} index={index} className="border-transport-300 focus-visible:border-transport-600" />
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
              className="flex-1 border-transport-300 text-transport-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={verifyOtp} 
              disabled={loading || otp.length < 4}
              className="flex-1 bg-transport-900 hover:bg-transport-800 shadow-md"
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
            disabled={sendingOtp || countdown > 0}
            className="w-full text-sm text-transport-700 hover:text-transport-900"
          >
            {sendingOtp ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : countdown > 0 ? (
              `Resend Code (${countdown}s)`
            ) : (
              "Resend Code"
            )}
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
