const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Recent acquisitions", href: "/recent-aquisitions" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-stone-200/80 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-white">Somewhere In Time</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-400">
              Curated art, antiques, and collectables for collectors and connoisseurs.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-stone-400 transition-colors hover:text-amber-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-stone-800 pt-8 text-center text-xs text-stone-500 sm:text-left">
          © {year} Somewhere In Time. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
