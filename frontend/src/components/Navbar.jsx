function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-300">
            TE
          </div>
          <div>
            <p className="text-lg font-semibold tracking-normal text-slate-950">
              Text Elevate
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              AI writing workspace
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Local API
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
