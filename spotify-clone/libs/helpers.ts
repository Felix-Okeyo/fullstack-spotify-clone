//this helpers aid in making requests, from the url to the posting of data and error handling

import { Price } from '@/types';

//this helper aids in deployment and reconfiguring the url from localhost to production url
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env. or deployment url
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel. and set to deployed url
    'http://localhost:3000/';
  
    // This makes sure the URL passed contains 'https://` when not in localhost.
  url = url.includes('http') ? url : `https://${url}`;
    
  // include trailing `/` in the url.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;

};


//creating a helper for fetching data based on the url configuration and in this case use the production url
export const postData = async ({
  url,
  data
}: {
  url: string;
  data?: { price: Price };
}) => {
  console.log('POSTING REQUEST,', url, data);

  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  //error handling
  if (!res.ok) {
    console.log('Error in postData', { url, data, res });

    throw Error(res.statusText);
  }

  //with no error, return the response
  return res.json();
};


export const toDateTime = (secs: number) => {
  var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};