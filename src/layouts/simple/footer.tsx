import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0f1720] text-gray-400">
      <div className="mx-auto max-w-[100%] px-4 py-3">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-4">
          {/* Left links */}
          <nav
            aria-label="footer-links"
            className="flex flex-wrap items-center gap-4 text-sm"
          >
            <Link to="/terms" className="transition-colors hover:text-white">
              Terms &amp; Conditions
            </Link>
            <span className="opacity-40">|</span>

            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <span className="opacity-40">|</span>

            <Link
              to="/complaints"
              className="transition-colors hover:text-white"
            >
              Complaints
            </Link>
          </nav>

          {/* Desktop text */}
          <p className="hidden text-right text-sm sm:block">
            © Copyright 2025 XXXX. All Rights Reserved.
          </p>

          {/* Mobile text */}
          <p className="w-full text-center text-sm sm:hidden">
            © Copyright 2025 XXXX. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
