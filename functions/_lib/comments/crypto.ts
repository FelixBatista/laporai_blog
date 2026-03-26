function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function sha256Hex(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(value);
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return toHex(hash);
}

export async function hashWithSalt(value: string, salt: string): Promise<string> {
  return sha256Hex(`${salt}:${value}`);
}

export function safeNormalize(value: string): string {
  return value.replace(/\r\n?/g, '\n').trim();
}
