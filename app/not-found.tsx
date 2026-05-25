import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-card p-12 text-center max-w-md">
        <div className="text-6xl mb-6">☯</div>
        <h1 className="font-serif text-3xl font-semibold mb-3 text-cream">
          404 — Not Found
        </h1>
        <p className="text-starlight/50 mb-8 text-sm leading-relaxed">
          The page you seek has wandered beyond the visible. Perhaps the oracle
          can guide you to clearer paths.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary text-sm">
            Return Home
          </Link>
          <Link href="/cast" className="btn-secondary text-sm">
            Cast a Hexagram
          </Link>
        </div>
      </div>
    </div>
  )
}
