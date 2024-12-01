import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header.jsx";
import LanguageSelector from "@/components/LanguageSelector/LanguageSelector";
import NavBar from "@/components/NavBar/NavBar";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <NavBar />
      <Header />
    </>
  );
}
