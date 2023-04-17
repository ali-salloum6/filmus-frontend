import Navbar from "@/components/Dashboard/Navbar/Navbar";
import { ReactElement, ReactNode } from "react";
import type { NextLayoutComponentType } from "next";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <ChakraProvider>
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
        </SessionProvider>
      </ChakraProvider>
    </>
  );
}
