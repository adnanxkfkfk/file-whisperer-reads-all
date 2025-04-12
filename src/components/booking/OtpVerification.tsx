
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";

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
      const encryptedData = await encryptData({ phone: phoneNumber });

      const response = await fetch("https://aqualemur.onpella.app/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encryptedData }),
      });

      if (response.ok) {
        toast({
          title: "OTP Sent",
          description: "A verification code has been sent to your mobile number.",
        });
        setOtpSent(true);
      } else {
        toast({
          title: "Failed to Send OTP",
          description: "There was an issue sending the verification code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      console.error("Error sending OTP:", error);
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
      const encryptedData = await encryptData({ phone: phoneNumber, otp });

      const response = await fetch("https://aqualemur.onpella.app/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encryptedData }),
      });

      const result = await response.json();
      
      if (response.ok && result.data) {
        const decryptedResult = await decryptData(result.data);
        if (decryptedResult && decryptedResult.verified === true) {
          onVerificationSuccess();
        } else {
          toast({
            title: "Verification Failed",
            description: "The code you entered is incorrect. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Verification Failed",
          description: "There was an issue verifying your code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  // Simplified encryption function for demo purposes
  // In production, use a proper encryption library
  const encryptData = async (data: any) => {
    // This is a simplified encryption for demo 
    // In production, implement proper encryption
    return btoa(JSON.stringify(data));
  };

  const decryptData = async (data: string) => {
    // This is a simplified decryption for demo
    // In production, implement proper decryption
    try {
      return JSON.parse(atob(data));
    } catch (e) {
      console.error("Failed to decrypt data:", e);
      return null;
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
          {sendingOtp ? "Sending..." : "Send Verification Code"}
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
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={sendOtp}
            disabled={sendingOtp}
            className="w-full text-sm"
          >
            {sendingOtp ? "Sending..." : "Resend Code"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
