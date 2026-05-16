function OutputBox({ text, activeTool }) {
  return (
    <div className="flex h-full min-h-[420px] flex-col rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Result</h2>
          <p className="text-sm text-slate-500">{activeTool} output</p>
        </div>
        <div className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
          Preview
        </div>
      </div>

      <div className="flex flex-1 p-4 sm:p-6">
        <div className="w-full whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base leading-7 text-slate-800">
          {text || (
            <span className="text-slate-400">
              Your processed text will appear here after you choose a tool.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default OutputBox;
