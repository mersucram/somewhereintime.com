const items = [
  {
    id: "oil-canvas",
    title: "Framed oil on canvas",
    description: "20th century landscape",
    image: {
      src: "https://images.unsplash.com/photo-1741722604270-2ea2ef58569c",
      alt: "Placeholder: impressionistic oil painting landscape",
    },
  },
  {
    id: "watercolour",
    title: "Watercolour study",
    description: "British school, circa 1910",
    image: {
      src: "https://images.unsplash.com/photo-1694373281438-bd8183b4d814",
      alt: "Placeholder: watercolour landscape painting",
    },
  },
  {
    id: "limited-print",
    title: "Limited edition print",
    description: "Signed and numbered",
    image: {
      src: "https://images.unsplash.com/photo-1646932537021-464ea1c6cb74",
      alt: "Placeholder: framed art prints on a gallery wall",
    },
  },
];

function buildSrc(baseUrl, width = 800) {
  const base = baseUrl.split("?")[0];
  return `${base}?auto=format&fit=crop&w=${width}&q=80`;
}

export default function FineArt() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-stone-900">
        Fine Art
      </h1>
      <p className="mt-4 text-stone-600">
        Paintings, prints, and works on paper selected for quality and
        provenance.
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
