


export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Top nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gray-900" />
          <span className="text-lg font-semibold">Nimbus Labs</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
          <a href="#product" className="hover:text-gray-900">
            Product
          </a>
          <a href="#pricing" className="hover:text-gray-900">
            Pricing
          </a>
          <a href="#about" className="hover:text-gray-900">
            About
          </a>
        </nav>

        <a
          href="/signup"
          className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Sign up for an account
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Now in beta — built for fast teams
            </p>

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Build faster workflows with simple, reliable tools.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
              Nimbus Labs helps teams ship with clarity—dashboards, automation, and
              lightweight collaboration that just works.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Sign up for an account
              </a>

              <a
                href="#product"
                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
              >
                See how it works
              </a>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              No credit card required · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-gray-600 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Nimbus Labs</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}