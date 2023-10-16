"use client";
import Button from "./Button";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { useSession } from "next-auth/react";

const theme = [
  { id: 1, name: "Default", disabled: false },
  { id: 2, name: "Moonlight", disabled: false },
  { id: 3, name: "Daylight", disabled: true },
  { id: 4, name: "Dusk", disabled: true },
  { id: 5, name: "Dawn", disabled: true },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const handleSubmit = () => {};
  const [selectedTheme, setSelectedTheme] = useState(theme[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      const storedPreferredTheme = localStorage.getItem("preferredTheme");
      let preferredTheme: string = "Default";
      let index = 0;
      if (storedPreferredTheme) {
        preferredTheme = storedPreferredTheme;
      } else {
        // @ts-ignore
        if (status === "authenticated" && session?.user?.preferredTheme) {
          // @ts-ignore
          preferredTheme = session?.user?.preferredTheme || "Default";
        }
      }
      console.log(preferredTheme);
      if (preferredTheme === "Default") {
        index = 0;
      } else if (preferredTheme === "Moonlight") {
        index = 1;
      }
      setSelectedTheme(theme[index]);
      document.documentElement.setAttribute(
        "data-theme",
        theme[index].name.toLowerCase()
      );
      localStorage.setItem("preferredTheme", preferredTheme);

      setMounted(true);
    } else {
      document.documentElement.setAttribute(
        "data-theme",
        selectedTheme.name.toLowerCase()
      );
      // @ts-ignore
      const username = session?.user?.username;
      fetch(`api/user?username=${encodeURIComponent(username)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: selectedTheme.name,
        }),
      });
      localStorage.setItem("preferredTheme", selectedTheme.name);
    }
  }, [selectedTheme, session, status]);
  return (
    <>
      <div className="relative flex filled-neutral justify-between items-center h-navbar box w-full px-3">
        <div className="flex items-center">
          <h1 className="mr-3 sm:mr-6">Wind92</h1>
          <Listbox value={selectedTheme} onChange={setSelectedTheme}>
            <Listbox.Label className="hidden sm:block sm:mr-3">
              Theme:
            </Listbox.Label>
            <div className="form-control">
              <Listbox.Button className="select">
                {selectedTheme.name}
                <div className="select-arrow" role="button"></div>
              </Listbox.Button>
              <Listbox.Options className="select-options">
                {theme.map((theme) => (
                  <Listbox.Option
                    className="select-option"
                    key={theme.id}
                    value={theme}
                    disabled={theme.disabled}
                  >
                    {theme.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        <Button disabled={!session} onClick={() => signOut()} color="accent">
          Logout
        </Button>
      </div>
      <div className="absolute top-navbar right-0 flex mt-3 justify-end px-3 text-on-wallpaper-color">
        {/* @ts-ignore */}
        {session?.user?.username && (
          // @ts-ignore
          <span>Logged in as {session?.user?.username}</span>
        )}
      </div>
    </>
  );
}
