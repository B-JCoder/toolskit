export const dynamic = "force-dynamic";

async function getCategoryPosts(slug: string) {
  const catRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/categories?slug=${slug}`,
  );
  const cat = (await catRes.json())[0];

  const postRes = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/posts?categories=${cat.id}&_embed`,
    { cache: "no-store" },
  );

  return postRes.json();
}

export default async function CategoryPage({ params }: any) {
  const posts = await getCategoryPosts(params.slug);

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10 capitalize">
        Category: {params.slug}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <a
            key={post.id}
            href={`/blog/${post.slug}`}
            className="border p-5 rounded-xl hover:shadow"
          >
            <h2 className="font-semibold mb-2">{post.title.rendered}</h2>
          </a>
        ))}
      </div>
    </section>
  );
}
