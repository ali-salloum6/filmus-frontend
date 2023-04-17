import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  return getLayout(<Component {...pageProps} />);
};

export default App;
