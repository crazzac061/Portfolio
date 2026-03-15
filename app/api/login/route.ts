import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { password } = await request.json();

  const adminPasswordHashBase64 = process.env.ADMIN_PASSWORD_HASH;

  if (!adminPasswordHashBase64) {
    console.error('ADMIN_PASSWORD_HASH is not defined in environment variables');
    return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
  }

  // Use the hash directly from environment variables
  const adminPasswordHash = adminPasswordHashBase64.trim();
  
  const isMatch = await bcrypt.compare(password, adminPasswordHash);

  if (isMatch) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
