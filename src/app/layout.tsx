import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/provider/provider";
import { Toaster } from "sonner";
import Header from "@/lib/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppers Gully",
  description: "MVP for Shopper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full relative`}>
        <Provider>
          <Header />
          {children}
          <Toaster richColors expand={true} />
        </Provider>
      </body>
    </html>
  );
}
