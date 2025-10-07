import { Request } from 'express';

export function getClientIp(req: Request): string {
  const xForwardedFor = req.headers['x-forwarded-for'] as string;
  const xRealIp = req.headers['x-real-ip'] as string;
  return xForwardedFor?.split(',')[0].trim() || xRealIp || req.socket.remoteAddress || 'unknown';
}
