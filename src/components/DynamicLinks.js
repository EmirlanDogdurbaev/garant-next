// components/DynamicLinks.js
import Link from "next/link";

const DynamicLinks = () => {
  const paths = [
    { slug: "post-1", locale: "en" },
    { slug: "post-1aadasd", locale: "ru" },
    { slug: "another", locale: "fr" },
  ];

  return (
    <div>
      {paths.map(({ slug, locale }) => (
        <Link key={slug} href={`/${locale}/${slug}`} locale={locale}>
          {`Go to ${slug} in ${locale}`}
        </Link>
      ))}
    </div>
  );
};

export default DynamicLinks;
