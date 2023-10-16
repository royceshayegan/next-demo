"use client";
import { useState } from "react";
import Window from "@/app/components/Window";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!username && password) {
      setError("I need to know what to call you.");
      return;
    } else if (!password && username) {
      setError("What about your password?");
      return;
    } else if (!username && !password) {
      setError("You haven't told me anything.");
      return;
    }
    try {
      // check if user exists
      const resUserExists = await fetch(
        `api/user?username=${encodeURIComponent(username)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const { user } = await resUserExists.json();
      if (user) {
        setError("I already know someone with that username.");
        return;
      }
      // create a user if user is available
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      // when successful, automatically login.
      if (res.ok) {
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

          const form = e.target;
          form.reset();
          setUsername("");
          setPassword("");
          router.replace("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("user creation failed.");
      }
    } catch (error) {
      console.log("error during user creation", error);
    }
  };
  return (
    <>
      <div className="flex justify-center pt-24 lg:pt-48 items-start mx-[4%]">
        <div className="flex flex-col max-w-sm w-full">
          <Window
            color="primary"
            title="I don't remember you..."
            onDismiss={() => {}}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <input
                  autoFocus
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className="filled-error px-3 py-1 mt-1 inline-block">
                  <span className="text-base">{error}</span>
                </div>
              )}
              <Button.Group>
                <Link href="/login">
                  <Button type="button" color="neutral">
                    I've been here before
                  </Button>
                </Link>
                <Button type="submit" color="accent">
                  Create Account
                </Button>
              </Button.Group>
            </form>
          </Window>
        </div>
      </div>
    </>
  );
}
