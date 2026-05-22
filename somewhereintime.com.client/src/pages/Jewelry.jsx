const items = [
  {
    id: "brooch",
    title: "Edwardian brooch",
    description: "Platinum and seed pearls",
    image: {
      src: "https://images.unsplash.com/photo-1708028868552-3800ce928ce3",
      alt: "Placeholder: close-up of an Edwardian pearl brooch",
    },
  },
  {
    id: "locket",
    title: "Victorian mourning locket",
    description: "Gold, circa 1870",
    image: {
      src: "https://images.unsplash.com/photo-1486821416551-68a65ef4d618",
      alt: "Placeholder: antique silver locket pendant on a book",
    },
  },
  {
    id: "signet-ring",
    title: "Gold signet ring",
    description: "Georgian, early 19th century",
    image: {
      src: "https://images.unsplash.com/photo-1689777238091-59591cdf13e7",
      alt: "Placeholder: close-up of gold signet rings",
    },
  },
];

function buildSrc(baseUrl, width = 800) {
  const base = baseUrl.split("?")[0];
  return `${base}?auto=format&fit=crop&w=${width}&q=80`;
}

export default function Jewelry() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-stone-900">
        Jewelry
      </h1>
      <p className="mt-4 text-stone-600">
        A selection of fine and period jewelry.
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
