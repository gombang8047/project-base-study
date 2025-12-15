import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// JS에서는 타입 없이 객체만 내보내면 됩니다.
export const metadata = {
  title: "Krafton Jungle",
  description: "Next.js Board Warm-up Project (JS)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="mx-auto flex min-h-screen max-w-screen-md flex-col border-x border-gray-100 bg-white shadow-2xl">
            <main className="w-full flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
