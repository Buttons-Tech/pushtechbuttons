import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-dunamis-key');

export async function POST(request: Request) {
  try {
    const { username, whatsappNumber } = await request.json();

    if (!username || !whatsappNumber) {
      return NextResponse.json({ error: 'Username and WhatsApp number required' }, { status: 400 });
    }

    // 1. Fetch or create user in DB (Pseudo-code for DB call)
    // const user = await db.user.upsert({ where: { whatsappNumber }, create: { username, whatsappNumber }, update: {} });
    const user = { id: 'usr_123', username, whatsappNumber, role: 'CAMPER' };

    // 2. Generate Session Token
    const token = await new SignJWT({ userId: user.id, username: user.username, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    // 3. Set httpOnly Cookie
    const response = NextResponse.json({ success: true, user });
    response.cookies.set('dunamis_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}