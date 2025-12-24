import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/posts?_embed`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Latest Blog Posts
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => {
          const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <Card key={post.id} className="hover:shadow-xl transition-shadow">
              {image && (
                <img
                  src={image}
                  alt={post.title.rendered}
                  className="h-52 w-full object-cover rounded-t-xl"
                />
              )}

              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">
                  {post.title.rendered}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div
                  className="text-sm text-muted-foreground line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered,
                  }}
                />

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-sm font-semibold text-primary hover:underline"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
