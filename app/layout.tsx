import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/comps/themeContext";
import './globals.css'

const ceraPro = localFont({
  src: [
    {
      path: "../public/fonts/CeraPro-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/CeraPro-Bold.ttf",
      weight: "800",
    },
  ],
  preload: true,
  variable: "--font-cera",
});

const benzin = localFont({
  src: [
    {
      path: "../public/fonts/Benzin-Medium.ttf",
      weight: "400",
    },
  ],
  preload: true,
  variable: "--font-benzin",
});

export const metadata: Metadata = {
  title: "Michał Zagajewski",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${ceraPro.variable} ${benzin.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
