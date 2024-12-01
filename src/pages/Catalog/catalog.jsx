export const catalog = ({ locales }) => {
  return {
    paths: [
      { params: { slug: "post-1" }, locale: "en" },
      { params: { slug: "post-1aadasd" }, locale: "ru" },
    ],
    fallback: true,
  };
};
