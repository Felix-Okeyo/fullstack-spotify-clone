//this file holds all the helpers needed for the webhook (to be integrated in the .env file) of stripe

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

import { Database } from '@/types_db';
import { Price, Product } from '@/types';

import { stripe } from './stripe';
import { toDateTime } from './helpers';

//config your supabase api for the current project this one
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// this enables the app's webhooks in such a way that when we add a product on the stripe dashboard, it is 
// inserted into the database
const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? undefined,
    image: product.images?.[0] ?? null,
    metadata: product.metadata
  };

  //add productData to db if there's an error, show it on the console
  const { error } = await supabaseAdmin.from('products').upsert([productData]);
  if (error) throw error;
  console.log(`Product inserted/updated: ${product.id}`);
};

//this adds the price record to the db similar to the upsertProductRecord method
const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? undefined,
    type: price.type,
    unit_amount: price.unit_amount ?? undefined,
    interval: price.recurring?.interval,
    interval_count: price.recurring?.interval_count,
    trial_period_days: price.recurring?.trial_period_days,
    metadata: price.metadata
  };

  //add priceData to db if there's an error, show it on the console
  const { error } = await supabaseAdmin.from('prices').upsert([priceData]);
  if (error) throw error;
  console.log(`Price inserted/updated: ${price.id}`);
};


//create or retrieve a customer from db
const createOrRetrieveCustomer = async ({
  email,
  uuid
}: {
  email: string;
  uuid: string;
}) => {
  const { data, error } = await supabaseAdmin
  .from('customers').select('stripe_customer_id').eq('id', uuid).single();
  
  //if there is no such customer, create one with unique user id and email address in a metadata object
  if (error || !data?.stripe_customer_id) {
    const customerData: { metadata: { supabaseUUID: string }; email?: string } =
      {
        metadata: {
          supabaseUUID: uuid
        }
      };

    //if email is valid, create the customer
    if (email) customerData.email = email;
    const customer = await stripe.customers.create(customerData);
    
    //add the customer to db
    const { error: supabaseError } = await supabaseAdmin
      .from('customers')
      .insert([{ id: uuid, stripe_customer_id: customer.id }]);

    //if there was a supabase error in adding the customer, show the error message
    if (supabaseError) throw supabaseError;

      //if all goes well, console.log the success message
    console.log(`New customer created and inserted for ${uuid}.`);
    return customer.id;
  }

  // if the customer was already there and registered, return the customer
  return data.stripe_customer_id;
};


//billing details for the customer
const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //check this assertion. this is the customer variable
  const customer = payment_method.customer as string;

  //extract needed items for billing 
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return; //return nothin if the user is not logged in
  
  //@ts-ignore - fix a typescripe error
  await stripe.customers.update(customer, { name, phone, address });

  //copy these details to the supabase db
  const { error } = await supabaseAdmin
    .from('users')
    .update({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] }
    })
    .eq('id', uuid);
  if (error) throw error;
};

//manages subscription status channges 
const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();
  if (noCustomerError) throw noCustomerError;

  //otherwise extract the id and ! fix the type errors
  const { id: uuid } = customerData!;

  
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });
  // Upsert the latest status of the subscription object.
  const subscriptionData: Database['public']['Tables']['subscriptions']['Insert'] =
    {
      id: subscription.id,
      user_id: uuid,
      metadata: subscription.metadata,
      // @ts-ignore
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      //TODO check quantity on subscription
      // @ts-ignore - handle typescript errors
      quantity: subscription.quantity,
      
      cancel_at_period_end: subscription.cancel_at_period_end,
      
      cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString(): null,
      
      canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString(): null,
      
      current_period_start: toDateTime(subscription.current_period_start).toISOString(),
      
      current_period_end: toDateTime(subscription.current_period_end).toISOString(),
      
      created: toDateTime(subscription.created).toISOString(),
      
      ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString(): null,
      
      trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString(): null,
      
      trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString(): null
    };

    //insert the subscription data into the db now
  const { error } = await supabaseAdmin.from('subscriptions').upsert([subscriptionData]);
  
  if (error) throw error;
    console.log(
        `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
};