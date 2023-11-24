import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { init } from "./middleware";

const Middleware = async ({ children }: any) => {
  const connection = await init(true);
  console.log(connection.database);
  return <>{children}</>;
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //Not the cleanest place, but for now, given that layouts cascade this layout will first get initialized, and the subsequent pages will get the connection
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Middleware>{children}</Middleware>
      </body>
    </html>
  );
}
