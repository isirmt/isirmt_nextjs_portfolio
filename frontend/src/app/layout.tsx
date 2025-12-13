import type { Metadata } from "next";
import "./globals.css";
import { notoSansJp } from "@/lib/fonts";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "isirmt(入本 聖也)",
  description: "isirmtのポートフォリオ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
