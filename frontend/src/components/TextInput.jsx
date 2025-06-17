function TextInput({ value, onChange, suggestion, onAcceptSuggestion }) {
  return (
    <div className="relative">
      <textarea
        className="w-full h-64 p-6 text-xl rounded-3xl bg-white/70 backdrop-blur border-2 border-blue-300 shadow-inner focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
        placeholder="Type your amazing text here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {suggestion && suggestion !== value && (
        <div
          className="mt-2 text-purple-500 text-lg opacity-70 cursor-pointer hover:opacity-100 transition"
          onClick={onAcceptSuggestion}
        >
          💡 {suggestion}
        </div>
      )}
    </div>
  );
}

export default TextInput;
