"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn, SignInResponse } from "next-auth/react";
import Window from "@/app/components/Window";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  console.log("username: ", username);
  console.log("password: ", password);
  console.log("error: ", error);
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials.");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex justify-center pt-24 lg:pt-48 items-start mx-[4%]">
        <div className="flex flex-col max-w-[500px] w-full">
          <Window
            color="primary"
            title="Welcome back"
            dismissable="back to login"
          >
            <form onSubmit={handleSubmit}>
              <input
              autoFocus
                className="my-1"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="my-1"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <div className="px-3 mt-1">
                  <span className="text-error text-sm">{error}</span>
                </div>
              )}
              <Button.Group>
                <Link href="/register">
                  <Button type="button" variant="flat">I'm new here</Button>
                </Link>
                <Button type="submit">Login</Button>
              </Button.Group>
            </form>
          </Window>
        </div>
      </div>
    </>
  );
}
