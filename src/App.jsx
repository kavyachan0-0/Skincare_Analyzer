import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [inputText, setInputText] = useState("");
  const [analysisType, setAnalysisType] = useState("ingredient");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeInput = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const prompt =
      analysisType === "ingredient"
        ? `Analyze this skincare ingredient: ${inputText}. Is it harmful, safe, or pore-clogging? Provide a brief explanation.`
        : `Analyze this home remedy: ${inputText}. Could it be harmful to the skin, or is it helpful? Provide a brief explanation.`;

    try {
      const response = await axios.post("http://localhost:5000/analyze", { prompt });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error:", error);
      setResult("❌ Error: Could not fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">✨ Skincare Analyzer</h1>
        <form onSubmit={analyzeInput} className="space-y-4">
          <input
            type="text"
            placeholder="e.g. Alcohol, Lemon Juice, Honey"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setAnalysisType("ingredient")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                analysisType === "ingredient"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Ingredient
            </button>
            <button
              type="button"
              onClick={() => setAnalysisType("remedy")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
                analysisType === "remedy"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Home Remedy
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {result && (
          <div className="mt-6 max-h-96 overflow-y-auto bg-gray-100 p-4 rounded-lg border border-gray-300 prose prose-sm sm:prose">
            <h2 className="font-semibold text-lg text-purple-700 mb-2">🔍 Analysis Result:</h2>
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
