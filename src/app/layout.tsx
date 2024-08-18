import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/provider/provider";
import { Toaster } from "sonner";
import Header from "@/lib/components/header";
import InsightRoll from "@/lib/components/insight-roll";

const inter = Inter({ subsets: ["latin"] });

const insights = [
  "Tech Stack: Next.js, TailwindCSS, TypeScript, PostgreSQL, AWS S3, Redux Toolkit, React-Query, Prisma ,Vercel", 
  "If you encounter any errors or bugs",
  "please report them on GitHub",
  "or reach out to me at puneet.kandpal@outlook.com",
  "Your suggestions and improvements are greatly appreciated",
  "Thank you for visiting !",
];

export const metadata: Metadata = {
  title: "Shoppers Gully",
  description: "MVP for Shoppers Gully",
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
          <InsightRoll insights={insights} />
          {children}
          <Toaster richColors expand={true} />
        </Provider>
      </body>
    </html>
  );
}
