

interface DecodedToken {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}


export function decodeJWT(token: string): DecodedToken | null {
  try {
    const parts = token.split('.');
    
    if (parts.length !== 3) {
      console.error('Invalid JWT format');
      return null;
    }
    
    const payload = parts[1];
    
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    
    const data = JSON.parse(decoded);
    
    return data;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}


export function getUserIdFromToken(token: string): string | null {
  const decoded = decodeJWT(token);
  return decoded?.id || null;
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  
  return decoded.exp * 1000 < Date.now();
}


export function getTokenExpiry(token: string): Date | null {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return null;
  
  return new Date(decoded.exp * 1000);
}


export function getUserInfoFromToken(token: string) {
  const decoded = decodeJWT(token);
  if (!decoded) return null;
  
  return {
    id: decoded.id,
    name: decoded.name,
    role: decoded.role,
    issuedAt: new Date(decoded.iat * 1000),
    expiresAt: new Date(decoded.exp * 1000),
    isExpired: isTokenExpired(token)
  };
}