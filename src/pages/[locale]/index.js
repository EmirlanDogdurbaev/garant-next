// pages/[locale]/index.js
import { useRouter } from "next/router";
import Link from "next/link";

export default function LocaleHome() {
  const { locale } = useRouter();

  return (
    <div>
      <h1>{locale === "fr" ? "Page d'accueil" : "Home Page"}</h1>
      <Link href={`/${locale}/post-1`}>Go to a post</Link>
    </div>
  );
}
