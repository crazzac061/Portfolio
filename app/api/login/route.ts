import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD is not defined in environment variables');
    return NextResponse.json({ success: false, error: 'Server configuration error' }, { status: 500 });
  }

  const isMatch = password === adminPassword.trim();

  if (isMatch) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
