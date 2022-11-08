import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import useOutsideClickDetection from "../hooks/useOutsideClickDetection";

export default function NavBar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);
  useOutsideClickDetection(dropdownRef, setIsOpen, isOpen);
  console.log("isOpen", isOpen);

  return (
    <nav className="flex justify-between bg-red-100 px-2 py-3">
      Logo
      <div>
        {!session ? (
          <div>
            <button onClick={() => signIn()}>Sign In</button>
          </div>
        ) : (
          <div
            className="flex items-center gap-3"
            onClick={() => setIsOpen(!isOpen)}
          >
            {session?.user?.name}
            <img
              src={session?.user?.image!}
              alt=""
              className="w-10 rounded-full"
            />
          </div>
        )}

        {isOpen && (
          <ul className="absolute w-32 bg-gray-200" ref={dropdownRef}>
            <li>Setting</li>
            <li
              onClick={() => signOut()}
              className="hover:cursor-pointer hover:bg-gray-600"
            >
              Signout
            </li>
            <li>3</li>
          </ul>
        )}
      </div>
    </nav>
  );
}
