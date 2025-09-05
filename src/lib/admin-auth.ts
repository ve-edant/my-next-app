// lib/admin-auth.ts
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AdminPayload {
  adminId: string;
  email: string;
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as AdminPayload;
    return payload;
  } catch (error) {
    return null;
  }
}

export function getAdminFromRequest(request: NextRequest): AdminPayload | null {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) return null;
  
  return verifyAdminToken(token);
}