function TextInput({ value, onChange }) {
  return (
    <textarea
      className="w-full h-40 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter your text here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default TextInput;
