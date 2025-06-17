function ToolButtons({ activeTool, onSelect }) {
  const tools = ["GEC", "Summarization", "Score"];

  return (
    <div className="flex gap-2">
      {tools.map((tool) => (
        <button
          key={tool}
          onClick={() => onSelect(tool)}
          className={`flex-1 py-2 rounded ${
            activeTool === tool
              ? "bg-blue-600 text-white"
              : "bg-white border text-blue-600"
          }`}
        >
          {tool}
        </button>
      ))}
    </div>
  );
}

export default ToolButtons;
