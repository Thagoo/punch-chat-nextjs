import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "@/lib/redux/Providers";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Punch Chat",
  description: "Punch Private Chat | Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="container-global">
            <Navbar />
            <Providers>{children}</Providers>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
