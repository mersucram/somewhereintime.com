const items = [
  {
    id: "sideboard",
    title: "Mahogany sideboard",
    description: "English, circa 1830",
    image: {
      src: "https://images.unsplash.com/photo-1695153557269-a94bf0f61698",
      alt: "Placeholder: antique mahogany sideboard",
    },
  },
  {
    id: "mantel-clock",
    title: "Victorian mantel clock",
    description: "Gilt brass, circa 1880",
    image: {
      src: "https://images.unsplash.com/photo-1568819867040-546bdd5b2d9e",
      alt: "Placeholder: ornate Victorian mantel clock",
    },
  },
  {
    id: "staffordshire",
    title: "Pair of Staffordshire figures",
    description: "Spaniels, mid-19th century",
    image: {
      src: "https://images.unsplash.com/photo-1739133978504-6f241f3db3a9",
      alt: "Placeholder: pair of antique Staffordshire ceramic dog figures",
    },
  },
];

function buildSrc(baseUrl, width = 800) {
  const base = baseUrl.split("?")[0];
  return `${base}?auto=format&fit=crop&w=${width}&q=80`;
}

export default function Antiques() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-stone-900">
        Antiques
      </h1>
      <p className="mt-4 text-stone-600">
        Furniture, decorative arts, and period pieces with character and
        craftsmanship.
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
