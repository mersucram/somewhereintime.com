const items = [
  {
    id: "landscape",
    title: "Untitled landscape",
    description: 'Oil on canvas, 20" × 16"',
    image: {
      src: "https://images.unsplash.com/photo-1694637110488-1e93798aca1f",
      alt: "Placeholder: oil painting of a countryside landscape",
    },
  },
  {
    id: "side-table",
    title: "Georgian side table",
    description: "Circa 1790",
    image: {
      src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      alt: "Placeholder: antique period side table",
    },
  },
  {
    id: "wristwatch",
    title: "Vintage wristwatch",
    description: "Rolex, 1960s",
    image: {
      src: "https://images.unsplash.com/photo-1565440962783-f87efdea99fd",
      alt: "Placeholder: vintage Rolex wristwatch with leather strap",
    },
  },
];

function buildSrc(baseUrl, width = 800) {
  const base = baseUrl.split("?")[0];
  return `${base}?auto=format&fit=crop&w=${width}&q=80`;
}

export default function RecentAquisitions() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-stone-900">
        Recent acquisitions
      </h1>
      <p className="mt-4 text-stone-600">
        A curated list of recently acquired pieces.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
              <img
                src={buildSrc(item.image.src)}
                srcSet={`${buildSrc(item.image.src, 400)} 400w, ${buildSrc(item.image.src, 800)} 800w`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt={item.image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-stone-900">{item.title}</h3>
              <p className="mt-1 text-sm text-stone-600">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
