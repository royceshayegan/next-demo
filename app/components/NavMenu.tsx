'use client';
import Button from "./Button";
import {signOut} from 'next-auth/react';
export default function NavMenu() {
    return (
        <>
        <div className="flex justify-end items-center h-16 w-full px-3">

            <Button onClick={() => signOut()}>Logout</Button>
        </div>
        </>
    );
}