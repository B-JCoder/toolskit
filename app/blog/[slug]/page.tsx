async function getPost(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP_API}/posts?slug=${slug}`
  );

  const data = await res.json();
  return data[0];
}

export default async function BlogPost({ params }: any) {
  const post = await getPost(params.slug);

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
