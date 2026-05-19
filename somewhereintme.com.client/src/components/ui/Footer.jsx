import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Recent acquisitions", href: "/recent-aquisitions" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/draco17315/",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Yelp",
    href: "https://www.yelp.com/biz/somewhere-in-time-collectibles-york-2",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.16 12.73l-4.703 1.14c-.48.116-.864-.432-.576-.863l2.654-3.966c.29-.435.91-.34 1.055.155l1.05 3.814c-.001-.001.002.598-.48.72zm-6.54 2.144l4.43 2.26c.452.23.43.888-.038 1.09l-3.658 1.575c-.47.202-.94-.2-.876-.706l.508-3.837c.064-.505.634-.382 1.086-.152l-.452-.23zm-1.398-1.586c.138.488-.3.93-.782.793l-4.627-1.34c-.48-.14-.575-.778-.15-1.053l3.822-2.47c.424-.274.93.014.97.516l.767 3.554zm-.424 2.88l-.23 4.8c-.023.505-.617.742-1 .403L7.53 18.09c-.382-.338-.248-.944.228-1.1l4.4-1.455c.475-.158.888.298.866.803l-.228-.108zm-.617-5.714l-2.35-4.14c-.24-.424.098-.936.578-.88l3.935.472c.48.058.704.61.44 1.01L12.1 10.55c-.264.4-.838.348-1.078-.076l.16-.04z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/somewhereintimecollectibles/",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-stone-200/80 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand + social */}
          <div>
            <p className="font-display text-lg font-semibold text-white">
              Somewhere In Time Collectibles, LLC
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-400">
              RESCUING THE PAST FOR YOUR FUTURE
            </p>
            <div className="mt-4 flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in new tab)`}
                  className="text-stone-400 transition-colors hover:text-amber-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-stone-400 transition-colors hover:text-amber-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-stone-800 pt-8 text-center text-xs text-stone-500 sm:text-left">
          <div className="flex items-center justify-between">
            <div>© {year} Somewhere In Time Collectibles, LLC. All rights reserved.</div>
            <div className="mt-0">
              <a href="/Menu/ping" className="text-stone-400 hover:text-amber-200">
                Server status
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
