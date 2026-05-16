function TextInput({
  value,
  onChange,
  suggestion,
  onAcceptSuggestion,
  tokenCount,
  children,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Source text</h2>
          <p className="text-sm text-slate-500">
            Paste or draft the paragraph you want to improve.
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
          {tokenCount} tokens
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <textarea
          className="h-[330px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-base leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
          placeholder="Paste your paragraph here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {suggestion && suggestion !== value && (
          <button
            className="mt-3 rounded-full bg-teal-50 px-4 py-2 text-left text-sm font-medium text-teal-700 transition hover:bg-teal-100"
            onClick={onAcceptSuggestion}
            type="button"
          >
            Accept suggestion
          </button>
        )}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/80 px-4 py-4 sm:px-6">
        {children}
      </div>
    </div>
  );
}

export default TextInput;
