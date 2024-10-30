import "@aws-amplify/ui-react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ConfigureAmplifyClientSide from "@/component/configureAmplify";
import ProviderTheme from "@/providers/themeProvider";
import { MessageProvider } from "@/providers/toastContext";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigureAmplifyClientSide />
        <ProviderTheme>
          <StoreProvider>
            <MessageProvider>{children}</MessageProvider>
          </StoreProvider>
        </ProviderTheme>
      </body>
    </html>
  );
}
