"use client";
import Button from "./Button";
import { signOut } from "next-auth/react";
export default function Navbar() {
  return (
    <>
      <div className="flex bg-surface-navbar text-on-surface-navbar justify-between items-center h-navbar box w-full px-3">
        <div className="flex items-center">
          <h1 className="mr-3">Wind92</h1>

          <p>Theme: Default</p>
        </div>

        <Button onClick={() => signOut()}>Logout</Button>
      </div>
    </>
  );
}
