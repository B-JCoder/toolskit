import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/posts?slug=${slug}&_embed`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data[0] || null;
}

export async function generateMetadata({ params }: any) {
  const post = await getPost(params.slug);

  if (!post) return {};

  return {
    title: post.yoast_head_json?.title || post.title.rendered,
    description:
      post.yoast_head_json?.description ||
      post.excerpt.rendered.replace(/<[^>]+>/g, ""),
    openGraph: {
      images: [post.yoast_head_json?.og_image?.[0]?.url],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) notFound();

  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">{post.title.rendered}</h1>

      {image && (
        <img
          src={image}
          alt={post.title.rendered}
          className="w-full h-[420px] object-cover rounded-xl mb-8"
        />
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.content.rendered,
        }}
      />
    </article>
  );
}
