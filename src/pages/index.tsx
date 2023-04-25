import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/Dashboard/Navbar/Navbar";
import Personal from "./dashboard/personal";
import Profile from "./dashboard/profile";
import Login from "./auth/login";
import Layout from "@/components/layout";
import { ReactElement } from "react";

// import Signup from "./auth/register";
// import "./App.css";
import { Box } from "@chakra-ui/react";
import type { NextLayoutComponentType } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Navbar />;
}
