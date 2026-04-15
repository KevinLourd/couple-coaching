"use client";

import { createContext, useContext, useState, useCallback } from "react";
import posthog from "posthog-js";
import { ContactModal } from "./contact-modal";

interface ContactModalContextValue {
  open: (source?: string) => void;
}

const ContactModalContext = createContext<ContactModalContextValue>({
  open: () => {},
});

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((source?: string) => {
    setIsOpen(true);
    posthog.capture("contact_modal_opened", { source: source ?? "unknown" });
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    posthog.capture("contact_modal_closed");
  }, []);

  return (
    <ContactModalContext.Provider value={{ open }}>
      {children}
      {isOpen && <ContactModal onClose={close} />}
    </ContactModalContext.Provider>
  );
}
