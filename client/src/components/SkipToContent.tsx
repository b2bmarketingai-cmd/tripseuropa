/**
 * SkipToContent component for accessibility
 * Allows keyboard users to skip navigation and go directly to main content
 * WCAG 2.1 Level A requirement
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-gold focus:ring-offset-2 transition-all"
      tabIndex={0}
    >
      Saltar al contenido principal
    </a>
  );
}
