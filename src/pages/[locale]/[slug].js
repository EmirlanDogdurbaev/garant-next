import { useRouter } from "next/router";

export default function Post() {
  const { query } = useRouter();
  const { locale, slug } = query;

  return (
    <div>
      <h1>{`Post: ${slug}`}</h1>
      <p>{`Locale: ${locale}`}</p>
    </div>
  );
}
