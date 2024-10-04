import Navbar from "@/components/nav";
import "./globals.css";
import Script from "next/script";
import { EnergyProvider } from "@/context/context";
import { Suspense } from "react";
import Loading from "./loading";


export const metadata= {
  title: "NONAGON",
  description: 'Minning Nonag Coin' 
}


const RootLayout = ({children}) => {
  return (
      <html lang="en">
          <head>
          <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
          </head>
        
          <body className="text-[#ffffff]">
            <Suspense fallback= {<Loading />}>
                <EnergyProvider>
                          <main className="">
                                    {children}
                                    <Navbar />
                          </main> 
                </EnergyProvider>
            </Suspense>
                                 
          </body> 

      </html>
  )
};



export default RootLayout;
