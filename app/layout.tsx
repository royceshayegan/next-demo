import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "./Provider";
import NavMenu from "./components/NavMenu";

export const metadata: Metadata = {
  title: "Next Demo App",
  description: "A demo CRUD app using nextjs, next-auth, mongodb, and prisma.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="default" data-ui="wind92" lang="en">
      <body>
        <AuthProvider>
          <NavMenu></NavMenu>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
