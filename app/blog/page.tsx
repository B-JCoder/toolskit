import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const PER_PAGE = 6;

async function getPosts(page = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/posts?_embed&per_page=${PER_PAGE}&page=${page}`,
    { cache: "no-store" },
  );
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export default async function BlogPage({ searchParams }: any) {
  const page = Number(searchParams.page) || 1;
  const posts = await getPosts(page);

  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Latest Articles</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => {
          const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

          return (
            <Card key={post.id} className="hover:shadow-xl transition">
              {img && (
                <img
                  src={img}
                  className="h-52 w-full object-cover rounded-t-xl"
                />
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">
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
                  className="mt-4 inline-block font-semibold text-primary"
                >
                  Read More →
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-12">
        {page > 1 && <Link href={`/blog?page=${page - 1}`}>← Prev</Link>}
        <Link href={`/blog?page=${page + 1}`}>Next →</Link>
      </div>
    </section>
  );
}
