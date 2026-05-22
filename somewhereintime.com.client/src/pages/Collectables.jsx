const items = [
  {
    id: "vintage-poster",
    title: "Vintage poster",
    description: "Early 20th century",
    image: {
      src: "https://images.unsplash.com/photo-1704138031624-7aec2ed01304",
      alt: "Placeholder: vintage early 20th century poster",
    },
  },
  {
    id: "cigarette-case",
    title: "Art Deco cigarette case",
    description: "Silver-plated, 1920s",
    image: {
      src: "https://images.unsplash.com/photo-1543060438-2752aef2efcd",
      alt: "Placeholder: Art Deco silver decorative object",
    },
  },
  {
    id: "tin-toy",
    title: "Tin toy",
    description: "Mechanical, 1950s",
    image: {
      src: "https://images.unsplash.com/photo-1700161735948-ae9f18a76110",
      alt: "Placeholder: vintage 1950s tin toy",
    },
  },
];

function buildSrc(baseUrl, width = 800) {
  const base = baseUrl.split("?")[0];
  return `${base}?auto=format&fit=crop&w=${width}&q=80`;
}

export default function Collectables() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-stone-900">
        Collectables
      </h1>
      <p className="mt-4 text-stone-600">
        Curated objects for collectors who value rarity, condition, and story.
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
