import type { Metadata } from "next";
import "./globals.css";

import { anton, raleway } from "@/public/fonts/font";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { NextUIProvider } from "@nextui-org/react";
// context
import { NoticeProvider } from "@/lib/context/notice-context";
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
    <html className="relative" lang="en">
      <body className={`${raleway.className}`}>
        <NoticeProvider>
          <Header />
          {children}
          <Footer />
          <div id="modal-root"></div>
        </NoticeProvider>
      </body>
    </html>
  );
}
