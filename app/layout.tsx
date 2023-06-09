import type { Metadata } from 'next'
import { Providers } from "../store/provider";
import "../styles/globals.css";
import Header from "./Header";

export const metadata: Metadata = {
  title: 'Movies',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
