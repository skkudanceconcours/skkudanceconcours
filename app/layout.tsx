import type { Metadata } from "next";
import "./globals.css";

import { anton, raleway } from "@/public/fonts/font";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "성균관대학교 무용학과 콩쿨",
  description: "성균관대학교 무용학과 콩쿨 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={raleway.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
