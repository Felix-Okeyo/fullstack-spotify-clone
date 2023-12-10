//this action fetches liked songs from currently logged in user
import { ProductWithPrice } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


const getActiveProductsWIthPrices= async (): Promise<ProductWithPrice[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
      });
  
      //fetch products and their prices using sql query 
      const { data, error } = await supabase
      .from('products').select('*, prices()')
      .eq('active', true)
      .eq('prices.active', true)
      .order('metadata->index', )
      .order('unit_amount', { foreignTable: 'prices'});

  
      //handle error 
      if (error) {
          console.log(error.message);
        }
  
        return (data as any) || []; //return the data as it is or as an empty array
  }
  

export default getActiveProductsWIthPrices;