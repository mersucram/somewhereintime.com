const items = [
  {
    id: "first-edition",
    title: "First edition novel",
    description: "Signed, 1920s",
    image: {
      src: "https://images.unsplash.com/photo-1773266109454-765e229ccc4a",
      alt: "Placeholder: row of antique leather-bound books on a shelf",
    },
  },
  {
    id: "manuscript",
    title: "Illuminated manuscript leaf",
    description: "Vellum, 15th century",
    image: {
      src: "https://images.unsplash.com/photo-1720700955854-9b531294d025",
      alt: "Placeholder: ornate script on aged parchment with gold accents",
    },
  },
  {
    id: "letters",
    title: "Victorian letters collection",
    description: "Bound correspondence, 1860s",
    image: {
      src: "https://images.unsplash.com/photo-1568842377941-63a9550044bf",
      alt: "Placeholder: vintage books and papers on a wooden surface",
    },
  },
];

function buildSrc(baseUrl, width = 800) {
  const base = baseUrl.split("?")[0];
  return `${base}?auto=format&fit=crop&w=${width}&q=80`;
}

export default function Literature() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-stone-900">
        Literature
      </h1>
      <p className="mt-4 text-stone-600">
        Rare books and manuscripts from private collections and estates.
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
