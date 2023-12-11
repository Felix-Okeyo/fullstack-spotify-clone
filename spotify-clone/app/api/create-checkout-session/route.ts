//this helper will handle the checkout process for a client's subscription

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

import { stripe } from '@/libs/stripe';
import { getURL } from '@/libs/helpers';
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin';

export async function POST(
  request: Request
) {
  try {
    const { price, quantity = 1, metadata = {} } = await request.json();
    
    //error handling here
    console.log('Received request with data:', { price, quantity, metadata });

    const supabase = createRouteHandlerClient({ cookies });      
    const { data: { user } } = await supabase.auth.getUser();
   
    //error handling here
    console.log('Supabase user:', user);

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || ''
    });
    
    //error handling here
    console.log('Stripe customer', customer);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: price.id,
          quantity
        }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata
      },
      success_url: `${getURL()}/account`,
      cancel_url: `${getURL()}/`
    });
    //error handler
    console.log('Created session:', session);

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.log('Error in create-checkout-session:', err);
    
    return new NextResponse('Internal Error', { status: 500 });
  }
}