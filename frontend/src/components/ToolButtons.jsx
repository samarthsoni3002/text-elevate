const tools = [
  {
    id: "GEC",
    label: "Correct grammar",
    meta: "Fix grammar, punctuation, and phrasing.",
  },
  {
    id: "Summarization",
    label: "Summarize",
    meta: "Shorten longer paragraphs into key points.",
  },
  {
    id: "Score",
    label: "Score writing",
    meta: "Check grammar, spelling, readability, and flow.",
  },
];

function ToolButtons({ activeTool, hasText, onSelect }) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">
            Choose what to do next
          </h3>
          <p className="text-sm text-slate-500">
            These actions run on the text above.
          </p>
        </div>
        {!hasText && (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Add text first
          </span>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => onSelect(tool.id)}
              className={`group flex min-h-32 flex-col justify-between rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-4 focus:ring-teal-500/15 ${
                isActive
                  ? "border-teal-500 bg-white shadow-lg shadow-teal-950/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/80"
              }`}
              type="button"
            >
              <span>
                <span className="block text-base font-semibold text-slate-950">
                  {tool.label}
                </span>
                <span className="mt-2 block text-sm leading-5 text-slate-500">
                  {tool.meta}
                </span>
              </span>
              <span
                className={`mt-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-semibold transition ${
                  isActive
                    ? "bg-teal-600 text-white"
                    : "bg-slate-100 text-slate-700 group-hover:bg-slate-950 group-hover:text-white"
                }`}
              >
                Run
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ToolButtons;
