// components/AppProviders.js
"use client"; // 👈 This is the most important part

import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

export default function AppProviders({ children }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable");
    // You could render an error message here
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId as string}>
      {children}
    </GoogleOAuthProvider>
  );
}
