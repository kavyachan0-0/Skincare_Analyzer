// import { useState } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import Tesseract from "tesseract.js";
// import { useRef } from "react";

// function App() {
//   const [inputText, setInputText] = useState("");
//   const [analysisType, setAnalysisType] = useState("ingredient");
//   const [result, setResult] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = async (event) => {
//     const image = event.target.files[0];
  
//     const {
//       data: { text },
//     } = await Tesseract.recognize(image, "eng", {
//       logger: (m) => console.log(m),
//     });
  
//     setInputText(text); // Automatically fill the input with extracted ingredients
//   };

//   const analyzeInput = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult("");

//     const prompt =
//       analysisType === "ingredient"
//         ? `Analyze this skincare ingredient: ${inputText}. Is it harmful, safe, or pore-clogging? Provide a brief explanation.`
//         : `Analyze this home remedy: ${inputText}. Could it be harmful to the skin, or is it helpful? Provide a brief explanation.`;

//     try {
//       const response = await axios.post("http://localhost:5000/analyze", { prompt });
//       setResult(response.data.result);
//     } catch (error) {
//       console.error("Error:", error);
//       setResult("❌ Error: Could not fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-4">
//       <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">✨ Skincare Analyzer</h1>
//         <form onSubmit={analyzeInput} className="space-y-4">
//         <input
//   type="file"
//   accept="image/*"
//   onChange={handleImageUpload}
//   className="mb-4"
// />

//           <input
//             type="text"
//             placeholder="e.g. Alcohol, Lemon Juice, Honey"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             required
//             className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />

//           <div className="flex justify-center gap-4">
//             <button
//               type="button"
//               onClick={() => setAnalysisType("ingredient")}
//               className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
//                 analysisType === "ingredient"
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Ingredient
//             </button>
//             <button
//               type="button"
//               onClick={() => setAnalysisType("remedy")}
//               className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
//                 analysisType === "remedy"
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Home Remedy
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
//           >
//             {loading ? "Analyzing..." : "Analyze"}
//           </button>
//         </form>

//         {result && (
//           <div className="mt-6 max-h-96 overflow-y-auto bg-gray-100 p-4 rounded-lg border border-gray-300 prose prose-sm sm:prose">
//             <h2 className="font-semibold text-lg text-purple-700 mb-2">🔍 Analysis Result:</h2>
//             <ReactMarkdown>{result}</ReactMarkdown>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;






// app.jsx
// import { useState } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import Tesseract from "tesseract.js";

// function App() {
//   const [inputText, setInputText] = useState("");
//   const [analysisType, setAnalysisType] = useState("ingredient");
//   const [skinType, setSkinType] = useState("normal");
//   const [result, setResult] = useState("");
//   const [riskLevel, setRiskLevel] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = async (event) => {
//     const image = event.target.files[0];
//     const {
//       data: { text },
//     } = await Tesseract.recognize(image, "eng", {
//       logger: (m) => console.log(m),
//     });
//     setInputText(text);
//   };

//   const getRiskLevelTag = () => {
//     switch (riskLevel) {
//       case "Safe":
//         return (
//           <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold w-fit mb-3">
//             🟢 Safe
//           </div>
//         );
//       case "Caution":
//         return (
//           <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold w-fit mb-3">
//             🟡 Use with caution
//           </div>
//         );
//       case "Harmful":
//         return (
//           <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold w-fit mb-3">
//             🔴 Harmful
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const extractRiskLevel = (text) => {
//     const lowerText = text.toLowerCase();
//     if (lowerText.includes("safe")) return "Safe";
//     if (lowerText.includes("caution") || lowerText.includes("use with caution")) return "Caution";
//     if (lowerText.includes("harmful") || lowerText.includes("pore-clogging")) return "Harmful";
//     return "";
//   };

//   const analyzeInput = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult("");
//     setRiskLevel("");

//     let prompt = "";

//     if (analysisType === "ingredient") {
//       prompt = `Analyze this skincare ingredient: ${inputText}. Is it harmful, safe, or pore-clogging for someone with ${skinType} skin? Provide a brief explanation.`;
//     } else {
//       prompt = `Analyze this home remedy: ${inputText}. Could it be harmful to someone with ${skinType} skin, or is it helpful? Provide a brief explanation.`;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/analyze", { prompt });
//       const text = response.data.result;
//       setResult(text);
//       const risk = extractRiskLevel(text);
//       setRiskLevel(risk);
//     } catch (error) {
//       console.error("Error:", error);
//       setResult("❌ Error: Could not fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-4">
//       <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">✨ Skincare Analyzer</h1>
//         <form onSubmit={analyzeInput} className="space-y-4">
//           <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

//           <input
//             type="text"
//             placeholder="e.g. Alcohol, Lemon Juice, Honey"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             required
//             className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />

//           {/* Skin Type Dropdown */}
//           <div>
//             <label className="font-medium">Select Skin Type:</label>
//             <select
//               value={skinType}
//               onChange={(e) => setSkinType(e.target.value)}
//               className="ml-2 p-2 border border-purple-300 rounded-md"
//             >
//               <option value="normal">Normal</option>
//               <option value="oily">Oily</option>
//               <option value="dry">Dry</option>
//               <option value="combination">Combination</option>
//               <option value="sensitive">Sensitive</option>
//             </select>
//           </div>

//           <div className="flex justify-center gap-4">
//             <button
//               type="button"
//               onClick={() => setAnalysisType("ingredient")}
//               className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
//                 analysisType === "ingredient"
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Ingredient
//             </button>
//             <button
//               type="button"
//               onClick={() => setAnalysisType("remedy")}
//               className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
//                 analysisType === "remedy"
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Home Remedy
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
//           >
//             {loading ? "Analyzing..." : "Analyze"}
//           </button>
//         </form>
//         {result && (
//   <div className="mt-6 w-full bg-white rounded-2xl shadow-md p-6 border border-gray-200 max-w-full overflow-hidden">
//     <h2 className="font-semibold text-xl text-purple-700 mb-4 flex items-center gap-2">
//       🔍 Analysis Result:
//     </h2>

//     {/* Risk Visualization */}
//     {riskLevel && getRiskLevelTag()}

//     {/* Skin Type Display */}
//     <p className="text-sm text-gray-700 mb-4">
//       👤 <span className="font-medium">Skin Type Analyzed:</span>{" "}
//       <span className="font-semibold capitalize">{skinType}</span>
//     </p>

//     {/* Result Text in Markdown */}
//     <div className="prose max-w-none prose-sm sm:prose-base text-gray-800">
//       <ReactMarkdown>{result}</ReactMarkdown>
//     </div>
//   </div>
// )}


//       </div>
//     </div>
//   );
// }

// export default App;





// import { useState } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import Tesseract from "tesseract.js";

// function App() {
//   const [inputText, setInputText] = useState("");
//   const [analysisType, setAnalysisType] = useState("ingredient");
//   const [skinType, setSkinType] = useState("normal");
//   const [result, setResult] = useState("");
//   const [riskLevel, setRiskLevel] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = async (event) => {
//     const image = event.target.files[0];
//     const {
//       data: { text },
//     } = await Tesseract.recognize(image, "eng", {
//       logger: (m) => console.log(m),
//     });
//     setInputText(text);
//   };

//   const getRiskLevelTag = () => {
//     switch (riskLevel) {
//       case "Safe":
//         return (
//           <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold w-fit mb-3">
//             🟢 Safe
//           </div>
//         );
//       case "Caution":
//         return (
//           <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold w-fit mb-3">
//             🟡 Use with caution
//           </div>
//         );
//       case "Harmful":
//         return (
//           <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold w-fit mb-3">
//             🔴 Harmful
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const extractRiskLevel = (text) => {
//     const lower = text.toLowerCase();
//     if (lower.includes("harmful")) return "Harmful";
//     if (lower.includes("caution") || lower.includes("use with caution")) return "Caution";
//     if (lower.includes("safe")) return "Safe";
//     return "";
//   };

//   const analyzeInput = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult("");
//     setRiskLevel("");

//     let prompt = "";

//     if (analysisType === "ingredient") {
//       prompt = `Analyze this skincare ingredient: ${inputText}. Is it harmful, safe, or pore-clogging for someone with ${skinType} skin? Provide a brief explanation.`;
//     } else {
//       prompt = `Analyze this home remedy: ${inputText}. Could it be harmful to someone with ${skinType} skin, or is it helpful? Provide a brief explanation.`;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/analyze", { prompt });
//       const text = response.data.result;
//       setResult(text);
//       const risk = extractRiskLevel(text);
//       setRiskLevel(risk);
//     } catch (error) {
//       console.error("Error:", error);
//       setResult("❌ Error: Could not fetch data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200 p-4">
//       <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">
//         <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">✨ Skincare Analyzer</h1>
//         <form onSubmit={analyzeInput} className="space-y-4">
//           <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

//           <input
//             type="text"
//             placeholder="e.g. Alcohol, Lemon Juice, Honey"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             required
//             className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />

//           <div>
//             <label className="font-medium">Select Skin Type:</label>
//             <select
//               value={skinType}
//               onChange={(e) => setSkinType(e.target.value)}
//               className="ml-2 p-2 border border-purple-300 rounded-md"
//             >
//               <option value="normal">Normal</option>
//               <option value="oily">Oily</option>
//               <option value="dry">Dry</option>
//               <option value="combination">Combination</option>
//               <option value="sensitive">Sensitive</option>
//             </select>
//           </div>

//           <div className="flex justify-center gap-4">
//             <button
//               type="button"
//               onClick={() => setAnalysisType("ingredient")}
//               className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
//                 analysisType === "ingredient"
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Ingredient
//             </button>
//             <button
//               type="button"
//               onClick={() => setAnalysisType("remedy")}
//               className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
//                 analysisType === "remedy"
//                   ? "bg-purple-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               Home Remedy
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
//           >
//             {loading ? "Analyzing..." : "Analyze"}
//           </button>
//         </form>

//         {result && (
//           <div className="mt-6 w-full bg-white rounded-2xl shadow-md p-6 border border-gray-200 max-w-full overflow-hidden">
//             <h2 className="font-semibold text-xl text-purple-700 mb-4 flex items-center gap-2">
//               🔍 Analysis Result:
//             </h2>

//             {/* Risk Level Tag */}
//             {riskLevel && getRiskLevelTag()}

//             {/* Skin Type Display */}
//             <p className="text-sm text-gray-700 mb-4">
//               👤 <span className="font-medium">Skin Type Analyzed:</span>{" "}
//               <span className="font-semibold capitalize">{skinType}</span>
//             </p>

//             <div className="prose max-w-none prose-sm sm:prose-base text-gray-800">
//               <ReactMarkdown>{result}</ReactMarkdown>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;





import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Tesseract from "tesseract.js";

function App() {
  const [inputText, setInputText] = useState("");
  const [analysisType, setAnalysisType] = useState("ingredient");
  const [skinType, setSkinType] = useState("normal");
  const [result, setResult] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    const {
      data: { text },
    } = await Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    });
    setInputText(text);
  };

  const getRiskLevelTag = () => {
    switch (riskLevel) {
      case "Safe":
        return (
          <div className="risk-tag safe">
            🟢 Safe
          </div>
        );
      case "Caution":
        return (
          <div className="risk-tag caution">
            🟡 Use with caution
          </div>
        );
      case "Harmful":
        return (
          <div className="risk-tag harmful">
            🔴 Harmful
          </div>
        );
      default:
        return null;
    }
  };

  const extractRiskLevel = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes("harmful")) return "Harmful";
    if (lower.includes("caution") || lower.includes("use with caution")) return "Caution";
    if (lower.includes("safe")) return "Safe";
    return "";
  };

  const analyzeInput = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setRiskLevel("");

    let prompt = "";

    if (analysisType === "ingredient") {
      prompt = `Analyze this skincare ingredient: ${inputText}. Is it harmful, safe, or pore-clogging for someone with ${skinType} skin? Provide a brief explanation.`;
    } else {
      prompt = `Analyze this home remedy: ${inputText}. Could it be harmful to someone with ${skinType} skin, or is it helpful? Provide a brief explanation.`;
    }

    try {
      const response = await axios.post("http://localhost:5000/analyze", { prompt });
      const text = response.data.result;
      setResult(text);
      const risk = extractRiskLevel(text);
      setRiskLevel(risk);
    } catch (error) {
      console.error("Error:", error);
      setResult("❌ Error: Could not fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="header">✨ Skincare Analyzer</h1>
        <form onSubmit={analyzeInput} className="form">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />

          <input
            type="text"
            placeholder="e.g. Alcohol, Lemon Juice, Honey"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
            className="input-text"
          />

          <div>
            <label className="skin-type-label">Select Skin Type:</label>
            <select
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              className="select-skin-type"
            >
              <option value="normal">Normal</option>
              <option value="oily">Oily</option>
              <option value="dry">Dry</option>
              <option value="combination">Combination</option>
              <option value="sensitive">Sensitive</option>
            </select>
          </div>

          <div className="button-group">
            <button
              type="button"
              onClick={() => setAnalysisType("ingredient")}
              className={`button ${analysisType === "ingredient" ? "active" : ""}`}
            >
              Ingredient
            </button>
            <button
              type="button"
              onClick={() => setAnalysisType("remedy")}
              className={`button ${analysisType === "remedy" ? "active" : ""}`}
            >
              Home Remedy
            </button>
          </div>

          <button type="submit" className="submit-button">
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>

        {result && (
          <div className="result-box">
            <h2 className="result-header">🔍 Analysis Result:</h2>

            {/* Risk Level Tag */}
            {riskLevel && getRiskLevelTag()}

            {/* Skin Type Display */}
            <p className="skin-type-display">
              👤 <span className="skin-type-label">Skin Type Analyzed:</span>{" "}
              <span className="skin-type-value">{skinType}</span>
            </p>

            <div className="markdown-container">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
