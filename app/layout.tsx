import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "YiGuide — Ancient Wisdom, Modern Clarity",
  description:
    "Discover clarity through the ancient I Ching. Ask a question, cast your hexagram, and receive AI-powered wisdom rooted in 3,000 years of Eastern philosophy.",
  keywords: [
    "I Ching",
    "Yi Jing",
    "divination",
    "ancient wisdom",
    "decision making",
    "self reflection",
    "oracle",
    "eastern philosophy",
    "hexagram",
    "spiritual guidance",
  ],
  authors: [{ name: "YiGuide" }],
  openGraph: {
    title: "YiGuide — Ancient Wisdom, Modern Clarity",
    description:
      "Discover clarity through the ancient I Ching. Ask a question, cast your hexagram, and receive AI-powered wisdom.",
    type: "website",
    locale: "en_US",
    siteName: "YiGuide",
  },
  twitter: {
    card: "summary_large_image",
    title: "YiGuide — Ancient Wisdom, Modern Clarity",
    description:
      "Discover clarity through the ancient I Ching. AI-powered wisdom rooted in 3,000 years of Eastern philosophy.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#0B0E14",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="YiGuide" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="min-h-full flex flex-col cosmic-bg font-sans">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0E14]/80 border-b border-white/[0.04]">
          <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5 group">
              <span className="text-2xl">☯</span>
              <span className="font-serif text-xl font-semibold text-cream group-hover:gold-text transition-all duration-300">
                YiGuide
              </span>
            </a>
            <div className="flex items-center gap-8">
              <a
                href="/cast"
                className="text-sm text-starlight/70 hover:text-cream transition-colors duration-200"
              >
                Cast
              </a>
              <a
                href="/pricing"
                className="text-sm text-starlight/70 hover:text-cream transition-colors duration-200"
              >
                Pricing
              </a>
              <a href="/cast" className="btn-primary text-sm py-2 px-5">
                Ask the Oracle →
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-white/[0.04] bg-cosmic-deep">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">☯</span>
                <span className="font-serif text-lg font-semibold gold-text">
                  YiGuide
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-starlight/50">
                <a href="/cast" className="hover:text-starlight/80 transition-colors">
                  Cast a Hexagram
                </a>
                <a href="/pricing" className="hover:text-starlight/80 transition-colors">
                  Pricing
                </a>
              </div>
              <p className="text-xs text-starlight/30">
                AI-generated insights for self-reflection and entertainment purposes only.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
