function ScoreCard({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="text-2xl font-bold text-blue-700">
        Final Score: {data.final_score}
      </div>
      <ul className="grid grid-cols-2 gap-4 text-lg">
        <li>
          <span className="font-medium">Grammar:</span> {data.grammar}
        </li>
        <li>
          <span className="font-medium">Spelling:</span> {data.spelling}
        </li>
        <li>
          <span className="font-medium">Readability:</span> {data.readability}
        </li>
        <li>
          <span className="font-medium">Vocabulary:</span> {data.vocabulary}
        </li>
        <li>
          <span className="font-medium">Conciseness:</span> {data.conciseness}
        </li>
      </ul>
    </div>
  );
}

export default ScoreCard;
