import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();

  // In a real app, you would use environment variables and proper hashing
  // For this portfolio, we use a simple check
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    // In a real app, you would set a secure cookie or JWT
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
