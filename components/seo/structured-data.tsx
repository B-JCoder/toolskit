interface StructuredDataProps {
  type: "WebApplication" | "SoftwareApplication" | "WebPage";
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
}

export function StructuredData({
  type,
  name,
  description,
  url,
  applicationCategory,
  operatingSystem,
}: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    name: name,
    description: description,
    url: url,
    applicationCategory: applicationCategory || "UtilityApplication",
    operatingSystem: operatingSystem || "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "ToolFixo",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
