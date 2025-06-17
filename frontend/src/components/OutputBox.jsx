function OutputBox({ text }) {
  return (
    <div className="border rounded p-4 min-h-40 bg-white shadow">
      {text ? (
        text
      ) : (
        <span className="text-gray-400">Output will appear here...</span>
      )}
    </div>
  );
}

export default OutputBox;
