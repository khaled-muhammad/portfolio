/** Person + Website JSON-LD for SEO */
export function JsonLdOrganization({
  name,
  url,
  description,
}: {
  name: string;
  url: string;
  description?: string | null;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    ...(description ?
      {
        description,
      }
    : {}),
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
