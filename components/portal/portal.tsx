"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children, targetId }: { children: ReactNode; targetId: string }) {
  const [mounted, setMounted] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setTargetElement(document.getElementById(targetId)); // Hedef elementi bul
  }, [targetId]);

  if (!mounted || !targetElement) return null;

  return createPortal(children, targetElement);
}
