import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Providers } from "@/lib/redux/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Punch Chat",
  description: "Punch Private Chat | Home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container-global">
          <Navbar />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
