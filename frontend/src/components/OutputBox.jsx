function OutputBox({ text }) {
  return (
    <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-6 shadow-xl min-h-40 text-lg">
      {text ? (
        text
      ) : (
        <span className="text-gray-500">Your result will appear here...</span>
      )}
    </div>
  );
}

export default OutputBox;
