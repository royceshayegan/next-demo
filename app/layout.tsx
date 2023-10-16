import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/app/components/Provider";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "Next Demo App",
  description: "A demo CRUD app using Wind92 UI, NextJs, NextAuth, and MongoDB.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="default" data-ui="wind92" lang="en" className="scaling-base">
      <body className="h-site bg-wallpaper">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
