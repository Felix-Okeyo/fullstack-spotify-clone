//support client requests for their specific songs as opposed to all songs in the db like 
// the getSongs action/ fetch does 
// then create an action getsongsbyid to authenticate the user and send back their songs

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();
  return res;
};