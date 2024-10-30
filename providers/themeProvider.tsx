"use client";
import { theme } from "@/common/theme";
import { ThemeProvider } from "@aws-amplify/ui-react";
import React from "react";

export default function ProviderTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      {children}
    </ThemeProvider>
  );
}
