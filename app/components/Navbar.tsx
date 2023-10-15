"use client";
import Button from "./Button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

const theme = [
  { id: 1, name: "Default", disabled: false },
  { id: 2, name: "Moonlight", disabled: false },
  { id: 3, name: "Daylight", disabled: false },
  { id: 4, name: "Dusk", disabled: false },
  { id: 5, name: "Dawn", disabled: false },
];
export default function Navbar() {
  const handleSubmit = () => {};
  const [selectedTheme, setSelectedTheme] = useState(theme[0]);
  return (
    <>
      <div className="flex filled-neutral justify-between items-center h-navbar box w-full px-3">
        <div className="flex items-center">
          <h1 className="mr-6">Wind92</h1>
          <Listbox value={selectedTheme} onChange={setSelectedTheme}>
            <Listbox.Label className="mr-3">Theme:</Listbox.Label>
            <div className="form-control">
              <Listbox.Button className="select">
                {selectedTheme.name}
                <button className="select-arrow"></button>
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

        <Button onClick={() => signOut()} color="accent">Logout</Button>
      </div>
    </>
  );
}
