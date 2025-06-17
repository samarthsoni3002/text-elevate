function ToolButtons({ activeTool, onSelect }) {
  const tools = ["GEC", "Summarization", "Score"];

  return (
    <div className="flex justify-center gap-6">
      {tools.map((tool) => (
        <button
          key={tool}
          onClick={() => onSelect(tool)}
          className={`px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-lg 
              ${
                activeTool === tool
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
              }`}
        >
          {tool}
        </button>
      ))}
    </div>
  );
}

export default ToolButtons;
