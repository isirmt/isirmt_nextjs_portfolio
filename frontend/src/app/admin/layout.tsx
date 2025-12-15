import AdminSessionProvider from "@/components/providers/adminSessionProvider";
import { notoSansJp } from "@/lib/fonts";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} antialiased`}>
        <AdminSessionProvider>{children}</AdminSessionProvider>
      </body>
    </html>
  );
}
