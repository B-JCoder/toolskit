export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-64 rounded-xl bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}
