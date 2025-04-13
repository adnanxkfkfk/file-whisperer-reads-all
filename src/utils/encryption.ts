
// This file is kept for backward compatibility, but the WhatsApp OTP API
// doesn't require encryption - it uses raw JSON

// Function for preparing payload (no encryption needed)
export async function encrypt(data: any): Promise<any> {
  return data;
}

// Function for parsing response (no decryption needed)
export async function decrypt(data: any): Promise<any> {
  return data;
}

// Simple functions for backward compatibility
export function simpleEncrypt(data: any): any {
  return data;
}

export function simpleDecrypt(data: any): any {
  return data;
}
