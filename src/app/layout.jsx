import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

// JS에서는 타입 없이 객체만 내보내면 됩니다.
export const metadata = {
  title: "Krafton Jungle",
  description: "Next.js Board Warm-up Project (JS)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
