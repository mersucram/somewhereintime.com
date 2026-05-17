import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import CategoryCard from "@/components/ui/CategoryCard";

const highlights = [
  {
    title: "Fine Art",
    description:
      "Paintings, prints, and works on paper selected for quality, provenance, and lasting appeal.",
    href: "/fine-art",
    image: {
      src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
      alt: "Placeholder: framed oil painting in a gallery setting",
    },
  },
  {
    title: "Antiques",
    description:
      "Furniture, decorative arts, and period pieces with character and craftsmanship.",
    href: "/antiques",
    image: {
      src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
      alt: "Placeholder: antique wooden chair and period furnishings",
    },
  },
  {
    title: "Collectables",
    description:
      "Curated objects for collectors who value rarity, condition, and story.",
    href: "/collectables",
    image: {
      src: "https://images.unsplash.com/photo-1767851522842-bd879e0feda3",
      alt: "Placeholder: curated vintage collectables on display",
    },
  },
];

function App() {
  return (
    <div className="flex min-h-svh flex-col bg-stone-50 text-stone-800">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-amber-50/80 via-white to-stone-50">
          <div
            className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl sm:h-96 sm:w-96"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-stone-300/25 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-800/90">
              Art &amp; Collectables
            </p>
            <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Timeless pieces, thoughtfully curated
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
              Somewhere In Time brings together fine art, antiques, jewelry,
              literature, and collectables for discerning buyers and sellers.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/recent-aquisitions"
                className="inline-flex items-center justify-center rounded-lg bg-amber-900 px-6 py-3 text-sm font-semibold text-amber-50 shadow-sm transition hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
              >
                Recent acquisitions
              </a>
              <a
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
              >
                About us
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              Explore the collection
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">
              Browse by category or get in touch to discuss consignment,
              acquisition, or a specific piece you have in mind.
            </p>
          </div>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <li key={item.title}>
                <CategoryCard {...item} />
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-stone-200/80 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
                Have something to sell or looking for a piece?
              </h2>
              <p className="mt-3 text-stone-600">
                We welcome inquiries about acquisitions, consignments, and
                private collections.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
            >
              Contact us
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
