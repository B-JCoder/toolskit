// app/blog/[slug]/page.tsx

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/posts?slug=${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const data = await res.json();

  // Agar slug exist nahi karta
  if (!data || data.length === 0) {
    return null;
  }

  return data[0];
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{post.title.rendered}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: post.content.rendered,
        }}
      />
    </div>
  );
}
