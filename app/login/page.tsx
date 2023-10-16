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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
        <div className="flex flex-col max-w-sm w-full">
          <Window
            color="primary"
            title="Welcome back"
            onDismiss={() => {}}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <input
                  autoFocus
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <span className="text-sm filled-error px-3 py-1 mt-1">
                  {error}
                </span>
              )}
              <Button.Group>
                <Link href="/register">
                  <Button type="button" variant="flat" color="neutral">
                    I'm new here
                  </Button>
                </Link>
                <Button type="submit" color="accent">
                  Login
                </Button>
              </Button.Group>
            </form>
          </Window>
        </div>
      </div>
    </>
  );
}
