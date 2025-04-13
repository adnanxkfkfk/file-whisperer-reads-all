
// Node.js crypto module doesn't work in browsers, so we'll use the Web Crypto API
const PASSWORD = "adnan";
const SALT = "otp_salt";

// Convert string to ArrayBuffer
function str2ab(str: string): ArrayBuffer {
  const buf = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
}

// Convert ArrayBuffer to Base64URL string
function ab2base64url(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Convert Base64URL string to ArrayBuffer
function base64url2ab(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Derive key from password and salt
async function getKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(PASSWORD);
  const saltBuffer = encoder.encode(SALT);
  
  const importedKey = await window.crypto.subtle.importKey(
    "raw", 
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: 100000,
      hash: "SHA-256"
    },
    importedKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Encrypt data
export async function encrypt(data: any): Promise<string> {
  const key = await getKey();
  const encoder = new TextEncoder();
  const jsonString = JSON.stringify(data);
  const plaintext = encoder.encode(jsonString);
  
  // Generate IV (Initialization Vector)
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  // Encrypt the data
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    key,
    plaintext
  );
  
  // Combine IV and encrypted data
  const combinedData = new Uint8Array(iv.length + new Uint8Array(encryptedData).length);
  combinedData.set(iv);
  combinedData.set(new Uint8Array(encryptedData), iv.length);
  
  // Convert to base64url
  return ab2base64url(combinedData);
}

// Decrypt data
export async function decrypt(encryptedBase64Url: string): Promise<any> {
  try {
    const key = await getKey();
    
    // Convert base64url to ArrayBuffer
    const encryptedData = base64url2ab(encryptedBase64Url);
    const encryptedBytes = new Uint8Array(encryptedData);
    
    // Extract IV and ciphertext
    const iv = encryptedBytes.slice(0, 12);
    const ciphertext = encryptedBytes.slice(12);
    
    // Decrypt
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv
      },
      key,
      ciphertext
    );
    
    // Convert to string and parse as JSON
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(decryptedData);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
}

// Simpler functions for backward compatibility
export function simpleEncrypt(data: any): string {
  const jsonStr = JSON.stringify(data);
  return window.btoa(encodeURIComponent(jsonStr))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function simpleDecrypt(str: string): any {
  try {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
      str += '=';
    }
    const jsonStr = decodeURIComponent(window.atob(str));
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Simple decryption error:", error);
    return null;
  }
}
