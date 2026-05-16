import { useState } from "react";
import Navbar from "./components/Navbar";
import TextInput from "./components/TextInput";
import ToolButtons from "./components/ToolButtons";
import OutputBox from "./components/OutputBox";
import ScoreCard from "./components/ScoreCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const toolDetails = {
  GEC: {
    eyebrow: "Grammar engine",
    title: "Correct grammar without flattening your voice.",
    description:
      "Clean up punctuation, sentence structure, and mechanical issues while keeping the original meaning intact.",
  },
  Summarization: {
    eyebrow: "Summary studio",
    title: "Turn long paragraphs into sharp takeaways.",
    description:
      "Best for 30 to 500 tokens. Paste a passage and get a concise version that is easier to scan.",
  },
  Score: {
    eyebrow: "Writing diagnostics",
    title: "Measure clarity, grammar, vocabulary, and flow.",
    description:
      "Score works best on complete paragraphs with at least 30 tokens and returns focused writing signals.",
  },
};

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [scoreData, setScoreData] = useState(null);
  const [activeTool, setActiveTool] = useState("GEC");
  const [loading, setLoading] = useState(false);

  const countTokens = (text) => {
    const trimmed = text.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  };

  const tokenCount = countTokens(inputText);
  const activeDetail = toolDetails[activeTool];

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
          `"${tool}" requires at least 30 tokens. You have ${tokens}.`,
        );
        return;
      }
      if (tokens > 500) {
        setOutputText(
          `"${tool}" supports up to 500 tokens. You have ${tokens}.`,
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

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
    <div className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2rem] border border-white bg-slate-950 text-white shadow-2xl shadow-slate-200">
          <div className="grid min-h-[220px] gap-8 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.34),transparent_32%),radial-gradient(circle_at_86%_16%,rgba(59,130,246,0.28),transparent_28%),linear-gradient(135deg,#0f172a_0%,#111827_54%,#042f2e_100%)] p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div className="flex max-w-2xl flex-col justify-between gap-8">
              <div className="space-y-5">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-teal-100">
                  {activeDetail.eyebrow}
                </div>
                <div className="space-y-4">
                  <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-normal sm:text-4xl">
                    Text Elevate
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                    Type your text below, then choose the action directly under
                    the editor. Results appear beside your draft.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="text-2xl font-semibold text-white">
                    {tokenCount}
                  </div>
                  <div>Tokens</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="text-2xl font-semibold text-white">3</div>
                  <div>AI tools</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="text-2xl font-semibold text-white">500</div>
                  <div>Token max</div>
                </div>
              </div>
            </div>

            <div className="flex items-end">
              <div className="w-full rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-teal-100">
                      Selected action
                    </p>
                    <p className="mt-1 text-2xl font-semibold">{activeTool}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-200">
                      {activeDetail.description}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-100">
                    Ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <TextInput
            value={inputText}
            onChange={setInputText}
            tokenCount={tokenCount}
          >
            <ToolButtons
              activeTool={activeTool}
              hasText={Boolean(inputText.trim())}
              onSelect={handleToolSelect}
            />
          </TextInput>

          <div className="min-h-[420px]">
            {loading ? (
              <div className="flex h-full min-h-[420px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-teal-500" />
                  <span className="text-base font-medium">Processing text</span>
                </div>
              </div>
            ) : activeTool === "Score" && scoreData ? (
              <ScoreCard data={scoreData} />
            ) : (
              <OutputBox text={outputText} activeTool={activeTool} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
