import { Link } from "react-router-dom";
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

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-stone-200/80 bg-gradient-to-b from-amber-50/80 via-white to-stone-50">
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-800/90">
                Art &amp; Collectables
              </p>

              <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
                Timeless pieces, thoughtfully curated
              </h1>

              <p className="mt-6 text-base leading-relaxed text-stone-600 sm:text-lg">
                Somewhere In Time Collectibles, LLC brings together fine art,
                antiques, jewelry, literature, and collectables for discerning
                buyers and sellers.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/recent-aquisitions"
                  className="inline-flex items-center justify-center rounded-lg bg-amber-900 px-6 py-3 text-sm font-semibold text-amber-50 shadow-sm transition hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                >
                  Recent acquisitions
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 shadow-sm transition hover:border-stone-400 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
                >
                  About us
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/assets/hero_1034495517249721109_n.jpg"
                  alt="Curated collection hero"
                  className="w-full h-64 object-cover sm:h-80 lg:h-[480px]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute left-6 bottom-6 right-6 text-white">
                    <h2 className="mt-1 text-lg font-semibold">RESCUING THE PAST FOR YOUR FUTURE</h2>
                </div>
              </div>
            </div>
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
              We welcome inquiries about acquisitions, consignments, and private
              collections.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
          >
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
