import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMenuOptions } from "@/api/menu";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { buildMenuItems } from "@/utils/menuNavigation";
import PingIndicator from "@/components/ui/PingIndicator";

const MOBILE_NAV_QUERY = "(max-width: 900px)";

const navLinkBase =
  "inline-flex w-full items-center justify-between gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-amber-50 hover:text-amber-900 min-[901px]:w-auto min-[901px]:justify-start min-[901px]:px-2 min-[901px]:py-2";

function NavLink({ href, children, className = "", onClick }) {
  return (
    <Link
      to={href}
      className={`${navLinkBase} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function Chevron({ open }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-stone-400 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function NavItem({ item, isMobile, mobileOpen, onNavigate }) {
  const [subOpen, setSubOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) {
      const t = setTimeout(() => setSubOpen(false), 0);
      return () => clearTimeout(t);
    }
  }, [mobileOpen]);

  const closeMenu = useCallback(() => {
    onNavigate?.();
    setSubOpen(false);
  }, [onNavigate]);

  if (item.children?.length) {
    const dropdownId = `nav-submenu-${item.key}`;

    return (
      <li className="group relative hover:z-50 focus-within:z-50">
        <button
          type="button"
          className={`${navLinkBase} cursor-pointer border-0 bg-transparent text-left`}
          aria-haspopup="true"
          aria-expanded={isMobile ? subOpen : undefined}
          aria-controls={dropdownId}
          onClick={isMobile ? () => setSubOpen((open) => !open) : undefined}
        >
          <span>{item.label}</span>
          <Chevron open={isMobile && subOpen} />
        </button>

        <ul
          id={dropdownId}
          role="menu"
          className={
            isMobile
              ? subOpen
                ? "mt-1 block space-y-0.5 border-l-2 border-amber-200/80 pl-2"
                : "hidden"
              : "absolute left-0 top-full z-50 m-0 hidden min-w-48 list-none rounded-lg border border-stone-200 bg-white p-1 pt-2 shadow-lg ring-1 ring-stone-900/5 group-hover:block group-focus-within:block"
          }
        >
          {item.children.map((child) => (
            <li key={child.key} role="none">
              <NavLink
                href={child.href}
                className="block rounded-md px-4 py-2"
                onClick={closeMenu}
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li>
      <NavLink href={item.href} onClick={onNavigate}>
        {item.label}
      </NavLink>
    </li>
  );
}

const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery(MOBILE_NAV_QUERY);

  useEffect(() => {
    let cancelled = false;

    async function loadMenu() {
      try {
        const data = await fetchMenuOptions();
        if (!cancelled) {
          setMenuItems(buildMenuItems(data.navigation));
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Menu service is unavailable",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMenu();

    return () => {
      cancelled = true;
    };
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const t = setTimeout(() => setMobileOpen(false), 0);
      return () => clearTimeout(t);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!mobileOpen || !isMobile) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen, isMobile]);

  return (
    <header className="sticky top-0 z-40 overflow-visible border-b border-stone-200/80 bg-white/90 backdrop-blur-md supports-backdrop-filter:bg-white/75">
      <nav
        className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="font-display text-lg font-semibold tracking-tight text-stone-900 transition-colors hover:text-amber-900 sm:text-xl"
            onClick={closeMobileMenu}
          >
            Somewhere In Time Collectibles, LLC
          </Link>

          {/* Ping indicator: shows server availability (online/offline) */}
          <PingIndicator />
        </div>

        {isMobile && (
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-stone-700 transition-colors hover:bg-amber-50 hover:text-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            aria-expanded={mobileOpen}
            aria-controls="main-menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">
              {mobileOpen ? "Close menu" : "Open menu"}
            </span>
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
                  mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-full rounded-full bg-current transition-all duration-200 ${
                  mobileOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "top-full -translate-y-full"
                }`}
              />
            </span>
          </button>
        )}

        {mobileOpen && isMobile && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-stone-900/40 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={closeMobileMenu}
          />
        )}

        <div
          id="main-menu"
          className="min-[901px]:flex min-[901px]:flex-1 min-[901px]:justify-end"
        >
          <div
            className={[
              "z-30 overflow-visible min-[901px]:block",
              isMobile
                ? [
                    "absolute inset-x-0 top-full border-b border-stone-200 bg-white px-4 py-3 shadow-lg",
                    "max-h-[min(70vh,calc(100svh-3.5rem))] overflow-y-auto overscroll-contain",
                    mobileOpen ? "block" : "hidden",
                  ].join(" ")
                : "",
            ].join(" ")}
          >
            {loading && (
              <p
                className="px-3 py-2 text-sm text-stone-500"
                aria-live="polite"
              >
                Loading menu…
              </p>
            )}
            {error && !loading && (
              <p className="px-3 py-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            {!loading && !error && menuItems.length === 0 && (
              <p className="px-3 py-2 text-sm text-red-600" role="alert">
                Menu is unavailable.
              </p>
            )}
            {!loading && !error && menuItems.length > 0 && (
              <ul className="flex flex-col gap-0.5 min-[901px]:flex-row min-[901px]:flex-wrap min-[901px]:items-center min-[901px]:justify-end min-[901px]:gap-1">
                {menuItems.map((item) => (
                  <NavItem
                    key={item.key}
                    item={item}
                    isMobile={isMobile}
                    mobileOpen={mobileOpen}
                    onNavigate={isMobile ? closeMobileMenu : undefined}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
