export const dynamic = "force-dynamic";

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div style={{ padding: 40 }}>
      <h1>Blog</h1>

      {posts.map((post: any) => (
        <div key={post.id} style={{ marginBottom: 30 }}>
          <h2>
            <a href={`/blog/${post.slug}`}>{post.title.rendered}</a>
          </h2>

          <div
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </div>
      ))}
    </div>
  );
}
