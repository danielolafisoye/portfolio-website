import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daniel Olafisoye | Links",
  description: "Official links for Daniel Olafisoye (Dannysoftdev). Software Engineer, Content Creator, and co-founder of LUDA BLACK.",
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Daniel Olafisoye",
    "alternateName": "Dannysoftdev",
    "url": "https://danielolafisoye.com",
    "jobTitle": [
      "Software Engineer",
      "Content Creator",
      "Founder"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "LUDA BLACK"
    },
    "sameAs": [
      "https://github.com/danielolafisoye",
      "https://za.linkedin.com/in/daniel-olafisoye",
      "https://www.tiktok.com/@dannysoftdev",
      "https://instagram.com/dannysoftdev",
      "https://youtube.com/@dannysoftdev"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}