export default function Footer() {
  return (
    <footer className="mt-16 border-t border-rose-100 bg-rose-50/40 py-8">
      <div className="mx-auto max-w-6xl px-4 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} Aura &amp; Ambiance — portfolio storefront prototype.</p>
      </div>
    </footer>
  )
}
