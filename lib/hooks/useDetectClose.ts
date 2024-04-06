"use client";
import { useEffect, useState } from "react";

export const useDetectClose = (
  elem: React.RefObject<HTMLElement>,
  initialState: boolean,
) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", outsideClick);
    }

    return () => {
      window.removeEventListener("click", outsideClick);
    };
  }, [isOpen, elem]);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function outsideClick(e: MouseEvent) {
    if (isOpen && elem.current && !elem.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }

  return [isOpen, setIsOpen, toggleDropdown, outsideClick];
};
