function buildImageUrls(baseUrl) {
  const base = baseUrl.split("?")[0];
  const params = "auto=format&fit=crop";

  return {
    src: `${base}?${params}&w=800&q=80`,
    srcSet: [
      `${base}?${params}&w=400&q=80 400w`,
      `${base}?${params}&w=800&q=80 800w`,
      `${base}?${params}&w=1200&q=80 1200w`,
    ].join(", "),
  };
}

export default function CategoryCard({ title, description, href, image }) {
  const { src, srcSet } = buildImageUrls(image.src);

  return (
    <a
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition hover:border-amber-200 hover:shadow-md"
    >
      <div className="relative aspect-[5/3] overflow-hidden bg-stone-200 sm:aspect-[4/3]">
        <img
          src={src}
          srcSet={srcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/25 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold text-stone-900 group-hover:text-amber-900">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{description}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-amber-900">
          View category
          <span
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </div>
    </a>
  );
}
