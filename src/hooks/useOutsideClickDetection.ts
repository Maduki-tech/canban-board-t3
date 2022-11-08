import React, { useEffect, useState } from "react";

export default function useOutsideClickDetection(
  ref: React.RefObject<HTMLUListElement | undefined> | undefined,
  stateFunction: React.Dispatch<React.SetStateAction<boolean>>,
  state: boolean
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref?.current && !ref?.current.contains(event.target)) {
        stateFunction(!state);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
}
