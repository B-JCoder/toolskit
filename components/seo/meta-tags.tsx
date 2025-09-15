import Head from "next/head"

interface MetaTagsProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
}

export function MetaTags({ title, description, keywords, canonical, ogImage }: MetaTagsProps) {
  const fullTitle = `${title} | Toolkit`
  const defaultOgImage = "/og-image.png"

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords.join(", ")} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Toolkit" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  )
}
