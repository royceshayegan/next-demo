import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import SessionProvider from "@/app/components/SessionProvider";
import { getServerSession } from "next-auth";
import {config} from '@/lib/auth';
export const metadata: Metadata = {
  title: "Next Demo App",
  description: "A demo CRUD app using Wind92 UI, NextJs, NextAuth, and MongoDB.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(config);
  return (
    <html data-theme="default" data-ui="wind92" lang="en" className="scaling-base">
      <body className="h-site bg-wallpaper-color">
        <SessionProvider session={session}>
          <Navbar />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
