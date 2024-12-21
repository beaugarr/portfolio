import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/comps/themeContext";

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
  variable: "--font-cera",
});

const benzin = localFont({
  src: [
    {
      path: "../public/fonts/Benzin-Medium.ttf",
      weight: "400",
    },
  ],
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
    <html lang="en">
      <body className={`${ceraPro.variable} ${benzin.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
