import { useEffect, useRef, useState } from "react";

/* ---------- icons ---------- */
function IconPin() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-amber-700"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.43-4.794 3.43-8.127a8.72 8.72 0 00-17.44 0c0 3.333 1.487 6.048 3.43 8.127a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.15.748zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function IconEmail() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-amber-700"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-amber-700"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function IconClock() {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-amber-700"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ---------- data ---------- */
const CONTACT_DETAILS = [
  {
    id: "address",
    label: "Address",
    lines: [
      "Somewhere In Time Collectibles, LLC",
      "3741 E Market St",
      "York, PA 17402",
    ],
    href: "https://maps.google.com/?q=3741+E+Market+St,+York,+PA+17402",
    icon: <IconPin />,
  },
  {
    id: "email",
    label: "Email",
    lines: ["hello@somewhereintime.com"],
    href: "mailto:hello@somewhereintime.com",
    icon: <IconEmail />,
  },
  {
    id: "phone",
    label: "Phone",
    lines: ["(717) 314-6767"],
    href: "tel:+17173146767",
    icon: <IconPhone />,
  },
];

const HOURS = [
  { day: "Monday", hours: null },
  { day: "Tuesday", hours: null },
  { day: "Wednesday", hours: "10 AM - 5 PM" },
  { day: "Thursday", hours: "10 AM - 5 PM" },
  { day: "Friday", hours: "10 AM - 6 PM" },
  { day: "Saturday", hours: "10 AM - 6 PM" },
  { day: "Sunday", hours: "11 AM - 5 PM" },
];

const ENQUIRY_TYPES = [
  { value: "", label: "Select an enquiry type" },
  { value: "acquisition", label: "Acquisition enquiry" },
  { value: "consignment", label: "Consignment / selling" },
  { value: "valuation", label: "Valuation" },
  { value: "general", label: "General enquiry" },
];

/* ---------- helpers ---------- */
const inputBase =
  "mt-1 block w-full rounded-md border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 shadow-sm transition focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600/20";

const inputError = "border-red-400 focus:border-red-500 focus:ring-red-500/20";

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-700">
        {label}
        {required && (
          <span className="ml-0.5 text-amber-700" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-xs text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.enquiryType) {
    errors.enquiryType = "Please select an enquiry type.";
  }
  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

/* ---------- page ---------- */
export default function Contact() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const nameRef = useRef(null);

  // Focus the name field when the page first loads
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }
    setStatus("submitting");
    // Simulated submission - replace with a real API call when ready
    setTimeout(() => {
      setStatus("success");
      setFields({
        name: "",
        email: "",
        phone: "",
        enquiryType: "",
        message: "",
      });
      setErrors({});
    }, 900);
  }

  return (
    <div className="bg-stone-50">
      {/* Page header */}
      <div className="border-b border-stone-200/80 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800/90">
            Get in touch
          </p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-600">
            For inquiries about acquisitions, consignments, valuations, or
            anything else, please fill in the form and we will respond within
            two business days.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left column: map + contact details */}
          <div className="flex flex-col gap-8">
            {/* OpenStreetMap embed */}
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
              <div className="h-72 w-full sm:h-80 lg:h-72 xl:h-80">
                <iframe
                  title="Somewhere In Time Collectibles, LLC location map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-76.6871%2C39.9923%2C-76.6571%2C40.0123&layer=mapnik&marker=40.0023%2C-76.6721"
                  className="h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  aria-label="Map showing Somewhere In Time Collectibles, LLC at 3741 E Market St, York, PA"
                />
              </div>
              <div className="flex justify-end border-t border-stone-100 bg-stone-50 px-4 py-2">
                <a
                  href="https://www.openstreetmap.org/?mlat=40.0023&mlon=-76.6721#map=16/40.0023/-76.6721"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-500 transition-colors hover:text-amber-800"
                >
                  View larger map
                </a>
              </div>
            </div>

            {/* Contact details card */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="font-display text-lg font-semibold text-stone-900">
                Contact details
              </h2>
              <ul className="mt-5 space-y-5">
                {CONTACT_DETAILS.map((detail) => (
                  <li key={detail.id} className="flex items-start gap-3">
                    <span className="mt-0.5">{detail.icon}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                        {detail.label}
                      </p>
                      {detail.lines.map((line, i) =>
                        detail.href && i === 0 ? (
                          <a
                            key={i}
                            href={detail.href}
                            className="block text-sm text-stone-700 transition-colors hover:text-amber-800"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={i} className="text-sm text-stone-700">
                            {line}
                          </p>
                        ),
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Hours */}
              <div className="mt-6 border-t border-stone-100 pt-5">
                <div className="flex items-center gap-2">
                  <IconClock />
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Hours
                  </p>
                </div>
                <table className="mt-3 w-full text-sm">
                  <tbody>
                    {HOURS.map(({ day, hours }) => (
                      <tr
                        key={day}
                        className="border-b border-stone-50 last:border-0"
                      >
                        <td className="py-1.5 pr-4 font-medium text-stone-700">
                          {day}
                        </td>
                        <td
                          className={`py-1.5 text-right ${hours ? "text-stone-700" : "text-stone-400"}`}
                        >
                          {hours ?? "Closed"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Social media */}
              <div className="mt-6 border-t border-stone-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Follow us
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <a
                    href="https://www.facebook.com/draco17315/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook (opens in new tab)"
                    className="text-stone-500 transition-colors hover:text-amber-800"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.yelp.com/biz/somewhere-in-time-collectibles-york-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Yelp (opens in new tab)"
                    className="text-stone-500 transition-colors hover:text-amber-800"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.16 12.73l-4.703 1.14c-.48.116-.864-.432-.576-.863l2.654-3.966c.29-.435.91-.34 1.055.155l1.05 3.814c-.001-.001.002.598-.48.72zm-6.54 2.144l4.43 2.26c.452.23.43.888-.038 1.09l-3.658 1.575c-.47.202-.94-.2-.876-.706l.508-3.837c.064-.505.634-.382 1.086-.152l-.452-.23zm-1.398-1.586c.138.488-.3.93-.782.793l-4.627-1.34c-.48-.14-.575-.778-.15-1.053l3.822-2.47c.424-.274.93.014.97.516l.767 3.554zm-.424 2.88l-.23 4.8c-.023.505-.617.742-1 .403L7.53 18.09c-.382-.338-.248-.944.228-1.1l4.4-1.455c.475-.158.888.298.866.803l-.228-.108zm-.617-5.714l-2.35-4.14c-.24-.424.098-.936.578-.88l3.935.472c.48.058.704.61.44 1.01L12.1 10.55c-.264.4-.838.348-1.078-.076l.16-.04z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/somewhereintimecollectibles/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram (opens in new tab)"
                    className="text-stone-500 transition-colors hover:text-amber-800"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: contact form */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display text-lg font-semibold text-stone-900">
              Send a message
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Fields marked{" "}
              <span className="text-amber-700" aria-hidden="true">
                *
              </span>{" "}
              are required.
            </p>

            {status === "success" ? (
              /* Success state */
              <div
                role="status"
                aria-live="polite"
                className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center"
              >
                <svg
                  className="mx-auto h-10 w-10 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="mt-3 text-base font-semibold text-stone-900">
                  Message sent!
                </p>
                <p className="mt-1 text-sm text-stone-600">
                  Thank you for getting in touch. We will respond within two
                  business days.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-5 text-sm font-medium text-amber-800 underline-offset-2 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* Contact form */
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="mt-6 grid gap-5"
              >
                {/* Name + Email side by side */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Name" required error={errors.name}>
                    <input
                      ref={nameRef}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={fields.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      aria-required="true"
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={!!errors.name}
                      className={`${inputBase}${errors.name ? ` ${inputError}` : ""}`}
                    />
                  </Field>

                  <Field id="email" label="Email" required error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      aria-required="true"
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      aria-invalid={!!errors.email}
                      className={`${inputBase}${errors.email ? ` ${inputError}` : ""}`}
                    />
                  </Field>
                </div>

                {/* Phone (optional) */}
                <Field id="phone" label="Phone" error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={fields.phone}
                    onChange={handleChange}
                    placeholder="+44 (optional)"
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    aria-invalid={!!errors.phone}
                    className={`${inputBase}${errors.phone ? ` ${inputError}` : ""}`}
                  />
                </Field>

                {/* Enquiry type */}
                <Field
                  id="enquiryType"
                  label="Enquiry type"
                  required
                  error={errors.enquiryType}
                >
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={fields.enquiryType}
                    onChange={handleChange}
                    aria-required="true"
                    aria-describedby={
                      errors.enquiryType ? "enquiryType-error" : undefined
                    }
                    aria-invalid={!!errors.enquiryType}
                    className={`${inputBase}${errors.enquiryType ? ` ${inputError}` : ""}`}
                  >
                    {ENQUIRY_TYPES.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.value === ""}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Message */}
                <Field
                  id="message"
                  label="Message"
                  required
                  error={errors.message}
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Tell us about the piece you are interested in, or describe how we can help..."
                    aria-required="true"
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    aria-invalid={!!errors.message}
                    className={`${inputBase} resize-y${errors.message ? ` ${inputError}` : ""}`}
                  />
                </Field>

                {/* Privacy note */}
                <p className="text-xs leading-relaxed text-stone-500">
                  Your details will only be used to respond to your enquiry and
                  will not be shared with third parties.
                </p>

                {/* Submit */}
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-900 px-6 py-2.5 text-sm font-semibold text-amber-50 shadow-sm transition hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-sm text-red-600" role="alert">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
