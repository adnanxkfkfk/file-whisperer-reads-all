
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

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

  // Encryption functions matching the PHP implementation
  const base64urlEncode = (data: ArrayBuffer): string => {
    return btoa(String.fromCharCode(...new Uint8Array(data)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const base64urlDecode = (str: string): ArrayBuffer => {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
      str += '=';
    }
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const encryptData = async (data: any): Promise<string> => {
    // Use the same password and salt as in PHP
    const password = "adnan";
    const salt = "otp_salt";
    
    // Generate key from password and salt
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
    
    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: encoder.encode(salt),
        iterations: 1000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    
    // Generate random IV
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    // Encrypt the data
    const jsonData = JSON.stringify(data);
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
        tagLength: 128,
      },
      key,
      encoder.encode(jsonData)
    );
    
    // Combine IV and encrypted data (similar to PHP implementation)
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encryptedData), iv.length);
    
    // Encode to base64url
    return base64urlEncode(combined);
  };

  const decryptData = async (encryptedText: string): Promise<any> => {
    try {
      // Use the same password and salt as in PHP
      const password = "adnan";
      const salt = "otp_salt";
      
      // Generate key from password and salt
      const encoder = new TextEncoder();
      const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
      );
      
      const key = await window.crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: encoder.encode(salt),
          iterations: 1000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );
      
      // Decode the base64url string
      const encryptedBuffer = base64urlDecode(encryptedText);
      
      // Extract IV (first 12 bytes) and ciphertext
      const iv = encryptedBuffer.slice(0, 12);
      const ciphertext = encryptedBuffer.slice(12);
      
      // Decrypt
      const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: new Uint8Array(iv),
          tagLength: 128,
        },
        key,
        ciphertext
      );
      
      // Convert to string and parse JSON
      const decoder = new TextDecoder();
      const jsonStr = decoder.decode(decryptedBuffer);
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
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
        const errorData = await response.text();
        console.error("Error response:", errorData);
        toast({
          title: "Failed to Send OTP",
          description: "There was an issue sending the verification code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
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

    try {
      const encryptedData = await encryptData({ phone: phoneNumber, otp });

      const response = await fetch("https://aqualemur.onpella.app/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encryptedData }),
      });

      const responseText = await response.text();
      console.log("API Response:", responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse JSON response:", e);
        toast({
          title: "Verification Failed",
          description: "Invalid response from server.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      if (response.ok && result.data) {
        try {
          const decryptedResult = await decryptData(result.data);
          console.log("Decrypted result:", decryptedResult);
          
          if (decryptedResult && decryptedResult.verified === true) {
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
        } catch (error) {
          console.error("Error decrypting result:", error);
          toast({
            title: "Verification Failed",
            description: "Error processing verification response.",
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
      console.error("Error verifying OTP:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
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
