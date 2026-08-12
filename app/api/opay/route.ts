import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, reference, customerName, tableNumber } = await req.json();

    // OPay Cashier / Create Order API Endpoint
    // https://doc.opaycheckout.com/
    const OPAY_API_URL = process.env.NODE_ENV === 'production'
      ? 'https://cashierapi.opaycheckout.com/api/v1/international/cashier/create'
      : 'https://testapi.opaycheckout.com/api/v1/international/cashier/create';

    const payload = {
      merchantId: process.env.OPAY_MERCHANT_ID,
      publicAuth: process.env.OPAY_PUBLIC_KEY,
      reference: reference,
      amount: {
        total: Math.round(amount * 100), // convert NGN to kobo
        currency: 'NGN',
      },
      product: {
        name: `Table ${tableNumber} Food Order`,
        description: `Restaurant Order for ${customerName}`,
      },
      returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/?orderSuccess=true&ref=${reference}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/?orderCancelled=true`,
    };

    /* Real production integration using HMAC SHA-512 authentication header:
       const response = await fetch(OPAY_API_URL, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${process.env.OPAY_SECRET_KEY}`,
         },
         body: JSON.stringify(payload),
       });
       const data = await response.json();
    */

    // Simulated OPay Cashier Response for seamless testing
    return NextResponse.json({
      code: '00000',
      message: 'SUCCESS',
      data: {
        cashierUrl: `https://cashier.opaycheckout.com/pay/${reference}`,
        reference: reference,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to initiate OPay payment' }, { status: 500 });
  }
}