import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts';
import middleware from "./middleware";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Not the cleanest place, but for now, given that layouts cascade this layout will first get initialized, and the subsequent pages will get the connection
  await middleware();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
