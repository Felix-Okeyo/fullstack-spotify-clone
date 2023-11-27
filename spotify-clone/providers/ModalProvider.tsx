"use client";
import { useState, useEffect } from "react";
  


// interface ModalProviderProps {
//         products: ProductWithPrice[];
//       }

const ModalProvider: React.FC<ModalProviderProps> = ({
    products
    //handle server side rendering by return a null to prevent errors in the client side 
    //rendering using useEffect and state
}) => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }

    return (
        <>
          {/* <AuthModal />
          <SubscribeModal products={products} />
          <UploadModal /> */}
        </>
      );

}


export default ModalProvider;