import { useState } from "react";
import Navbar from "./components/Navbar";
import TextInput from "./components/TextInput";
import ToolButtons from "./components/ToolButtons";
import OutputBox from "./components/OutputBox";
import ScoreCard from "./components/ScoreCard";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [scoreData, setScoreData] = useState(null);
  const [activeTool, setActiveTool] = useState("GEC");
  const [loading, setLoading] = useState(false);

  const countTokens = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const handleToolSelect = async (tool) => {
    setActiveTool(tool);
    setScoreData(null);
    setOutputText("");

    if (!inputText.trim()) {
      setOutputText("Please enter some text.");
      return;
    }

    const tokens = countTokens(inputText);

    if (tool === "Summarization" || tool === "Score") {
      if (tokens < 30) {
        setOutputText(
          `"${tool}" requires at least 30 tokens. You have ${tokens}.`
        );
        return;
      }
      if (tokens > 500) {
        setOutputText(
          `"${tool}" supports up to 500 tokens. You have ${tokens}.`
        );
        return;
      }
    }

    setLoading(true);
    try {
      let endpoint = "";
      if (tool === "GEC") endpoint = "/grammar_correct";
      else if (tool === "Summarization") endpoint = "/summarize";
      else if (tool === "Score") endpoint = "/paragraph_scorer";

      const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      if (tool === "GEC") {
        setOutputText(data.corrected_text || "No result");
      } else if (tool === "Summarization") {
        setOutputText(data.summary || "No result");
      } else if (tool === "Score") {
        setScoreData(data);
      }
    } catch (err) {
      console.error(err);
      setOutputText("Error contacting the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-12 p-8 space-y-8">
        <TextInput value={inputText} onChange={setInputText} />
        <ToolButtons activeTool={activeTool} onSelect={handleToolSelect} />
        <div>
          {loading ? (
            <div className="text-center text-xl text-gray-600">
              Processing...
            </div>
          ) : (
            <>
              {activeTool === "Score" && scoreData ? (
                <ScoreCard data={scoreData} />
              ) : (
                <OutputBox text={outputText} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
