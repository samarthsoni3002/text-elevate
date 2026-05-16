const scoreFields = [
  ["Grammar", "grammar"],
  ["Spelling", "spelling"],
  ["Readability", "readability"],
  ["Vocabulary", "vocabulary"],
  ["Conciseness", "conciseness"],
];

function ScoreCard({ data }) {
  return (
    <div className="h-full min-h-[420px] rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <p className="text-sm font-medium text-slate-500">Writing score</p>
        <div className="mt-2 flex items-end gap-3">
          <span className="text-5xl font-semibold tracking-normal text-slate-950">
            {data.final_score}
          </span>
          <span className="pb-2 text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
            Final
          </span>
        </div>
      </div>

      <div className="grid gap-3 p-4 sm:p-6">
        {scoreFields.map(([label, key]) => (
          <div
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            key={key}
          >
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="font-medium text-slate-700">{label}</span>
              <span className="font-semibold text-slate-950">{data[key]}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-teal-500"
                style={{ width: `${Math.min(Number(data[key]) || 0, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreCard;
