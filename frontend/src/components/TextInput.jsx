function TextInput({ value, onChange }) {
  return (
    <textarea
      className="w-full h-64 p-6 text-xl rounded-3xl bg-white/70 backdrop-blur border-2 border-blue-300 shadow-inner focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
      placeholder="Type your amazing text here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextInput;
