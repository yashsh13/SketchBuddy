'use client'

import "./globals.css";
import ReduxProvider from "@repo/redux/provider"; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body >
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
