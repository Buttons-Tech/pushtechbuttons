import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Verify OPay signature here using your Secret Key
    const { reference, amount, status, userWhatsApp } = payload;

    if (status === 'SUCCESS') {
      // Execute database transaction:
      // 1. Mark transaction record as PAID
      // 2. Increment user wallet balance by `amount`
      
      console.log(`[OPAY SUCCESS] Credited ₦${amount} to ${userWhatsApp}`);
      
      return NextResponse.json({ status: 'SUCCESS' });
    }

    return NextResponse.json({ status: 'FAILED' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 });
  }
}