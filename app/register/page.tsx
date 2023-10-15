"use client";
import { useState } from "react";
import Window from "@/app/components/Window";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  console.log("username: ", username);
  console.log("password: ", password);
  console.log("error: ", error);
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
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
        }),
      });
      const { user } = await resUserExists.json();
      if (user) {
        setError("I already know someone with that username.");
        return;
      }
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/login");
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
        <div className="flex flex-col max-w-[500px] w-full">
          <Window
            color="primary"
            title="I don't remember you..."
            dismissable="back to login"
          >
            <form onSubmit={handleSubmit}>
              <input
                className="my-1"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="my-1"
                type="text"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <div className="px-3 mt-1">
                  <span className="text-error text-sm">{error}</span>
                </div>
              )}
              <Button.Group>
                <Link href="/login">
                  <Button type="button" variant="flat">I've been here before</Button>
                </Link>
                <Button type="submit">Create Account</Button>
              </Button.Group>
            </form>
          </Window>
        </div>
      </div>
    </>
  );
}
