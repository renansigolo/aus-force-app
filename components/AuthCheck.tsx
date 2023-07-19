"use client";

import { UserContext } from "@/app/Providers";
import { useContext } from "react";

const mockUser = {
  displayName: "Renan",
  email: "renan.sigolo@gmail.com",
};

/** Component's children only shown to logged-in users */
export function AuthCheck(props: any) {
  const user = useContext(UserContext);
  return props.children;
  // return user ? props.children : props.fallback || redirect("/log-in")
}
