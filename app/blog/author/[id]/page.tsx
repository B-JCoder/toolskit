export const dynamic = "force-dynamic";

async function getAuthorPosts(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/posts?author=${id}&_embed`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function AuthorPage({ params }: any) {
  const posts = await getAuthorPosts(params.id);

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10">Articles by Author</h1>

      {posts.map((post: any) => (
        <a
          key={post.id}
          href={`/blog/${post.slug}`}
          className="block mb-4 hover:underline"
        >
          {post.title.rendered}
        </a>
      ))}
    </section>
  );
}
