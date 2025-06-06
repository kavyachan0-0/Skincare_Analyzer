import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Tesseract from "tesseract.js";
import "./App.css";

// Sample recommendation data (you can replace with real API data)
const skincareRecommendations = {
  ingredient: {
    safe: [
      {
        name: "Hyaluronic Acid",
        type: "Hydrating",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400"
      },
      {
        name: "Vitamin C Serum",
        type: "Brightening",
        image: "https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?w=400"
      },
      {
        name: "Niacinamide",
        type: "Pore-refining",
        image: "https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=400"
      }
    ],
    caution: [
      {
        name: "Retinol",
        type: "Anti-aging",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400"
      },
      {
        name: "Glycolic Acid",
        type: "Exfoliating",
        image: "https://images.unsplash.com/photo-1612532774276-cfa70c72b901?w=400"
      }
    ]
  },
  remedy: {
    safe: [
      {
        name: "Honey Mask",
        type: "Natural Moisturizer",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"
      },
      {
        name: "Aloe Vera",
        type: "Soothing",
        image: "https://images.unsplash.com/photo-1604239128597-baad42a29f43?w=400"
      },
      {
        name: "Green Tea",
        type: "Antioxidant",
        image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400"
      }
    ],
    caution: [
      {
        name: "Lemon Juice",
        type: "Natural Astringent",
        image: "https://images.unsplash.com/photo-1590502593744-2bf76f9e3195?w=400"
      }
    ]
  }
};

// Sample recommendation data (you can replace with real API data)
const alternativeProducts = {
  alcohol: [
    {
      name: "Alcohol-Free Rose Water Toner",
      type: "Hydrating",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
      safeIngredient: "Rose Water"
    },
    {
      name: "Gentle Aloe Vera Cleanser",
      type: "Cleansing",
      image: "https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=400",
      safeIngredient: "Aloe Vera"
    },
    {
      name: "Chamomile Calming Toner",
      type: "Soothing",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400",
      safeIngredient: "Chamomile"
    }
  ],
  lemon: [
    {
      name: "Vitamin C Brightening Serum",
      type: "Brightening",
      image: "https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?w=400",
      safeIngredient: "Ascorbic Acid"
    },
    {
      name: "Niacinamide Brightening Solution",
      type: "Brightening",
      image: "https://images.unsplash.com/photo-1612532774276-cfa70c72b901?w=400",
      safeIngredient: "Niacinamide"
    },
    {
      name: "Alpha Arbutin Serum",
      type: "Dark Spot Treatment",
      image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400",
      safeIngredient: "Alpha Arbutin"
    }
  ],
  acid: [
    {
      name: "Gentle PHA Exfoliant",
      type: "Exfoliating",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
      safeIngredient: "PHA"
    },
    {
      name: "Hydrating Toner",
      type: "Toning",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
      safeIngredient: "Rose Water"
    },
    {
      name: "Enzyme Exfoliator",
      type: "Gentle Exfoliation",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400",
      safeIngredient: "Papain Enzyme"
    }
  ],
  honey: [
    {
      name: "Natural Honey Moisturizer",
      type: "Hydrating",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400",
      safeIngredient: "Manuka Honey"
    },
    {
      name: "Propolis Healing Cream",
      type: "Treatment",
      image: "https://images.unsplash.com/photo-1604239128597-baad42a29f43?w=400",
      safeIngredient: "Propolis"
    },
    {
      name: "Royal Jelly Face Mask",
      type: "Nourishing",
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400",
      safeIngredient: "Royal Jelly"
    }
  ]
};

function App() {
  const [inputText, setInputText] = useState("");
  const [analysisType, setAnalysisType] = useState("ingredient");
  const [skinType, setSkinType] = useState("normal");
  const [result, setResult] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = async (event) => {
    const image = event.target.files[0];
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setUploadedImage(imageUrl);
      setPreviewImage(imageUrl);
      setLoading(true);
      try {
        const {
          data: { text },
        } = await Tesseract.recognize(image, "eng", {
          logger: (m) => console.log(m),
        });
        setInputText(text);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getRecommendations = () => {
    if (!riskLevel) return [];
    const isLowRisk = riskLevel === "Safe";
    return skincareRecommendations[analysisType][isLowRisk ? "safe" : "caution"];
  };

  const getRiskLevelTag = () => {
    switch (riskLevel) {
      case "Safe":
        return (
          <div className="risk-tag safe">
            ✨ Safe for Your Skin
          </div>
        );
      case "Caution":
        return (
          <div className="risk-tag caution">
            ⚠️ Use with Professional Guidance
          </div>
        );
      case "Harmful":
        return (
          <div className="risk-tag harmful">
            ⛔ Not Recommended for Your Skin
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

  const getProductFeatures = () => {
    const ingredients = inputText.toLowerCase().split(',').map(i => i.trim());
    const features = {
      positive: [],
      negative: []
    };

    // Check for alcohols
    if (ingredients.some(i => i.includes('alcohol'))) {
      features.negative.push('Contains Alcohol 🍷');
    } else {
      features.positive.push('Alcohol-free ✨');
    }

    // Check for acids
    if (ingredients.some(i => i.includes('acid'))) {
      features.negative.push('Contains Acids 🧪');
    }

    // Check for natural ingredients
    if (ingredients.some(i => ['honey', 'aloe', 'tea'].includes(i))) {
      features.positive.push('Contains Natural Ingredients 🌿');
    }

    // Check for citrus
    if (ingredients.some(i => ['lemon', 'orange', 'lime', 'citrus'].includes(i))) {
      features.negative.push('Contains Citrus 🍋');
    }

    // Check for pore-clogging ingredients
    if (ingredients.some(i => ['coconut oil', 'lanolin', 'mineral oil'].includes(i))) {
      features.negative.push('May Clog Pores 🕳️');
    } else {
      features.positive.push('Non-Comedogenic 👌');
    }

    // Add some default safe features if applicable
    if (!ingredients.some(i => i.includes('fragrance'))) {
      features.positive.push('Fragrance-free 🌸');
    }
    
    if (!ingredients.some(i => i.includes('paraben'))) {
      features.positive.push('Paraben-free 🌱');
    }

    if (!ingredients.some(i => i.includes('sulfate'))) {
      features.positive.push('Sulfate-free 💧');
    }

    return features;
  };

  const getRiskLevelInfo = () => {
    switch (riskLevel) {
      case "Safe":
        return {
          icon: "✨",
          title: "Safe for Your Skin",
          description: "This ingredient is generally considered safe and well-tolerated for your skin type.",
          className: "risk-safe"
         
        };
      case "Caution":
        return {
          icon: "⚠️",
          title: "Use with Professional Guidance",
          description: "This ingredient may require careful use and professional consultation.",
          className: "risk-caution"
        };
      case "Harmful":
        return {
          icon: "⛔",
          title: "Not Recommended",
          description: "This ingredient might be harmful or irritating for your skin type.",
          className: "risk-harmful"
        };
      default:
        return null;
    }
  };

  const getAlternatives = () => {
    const ingredients = inputText.toLowerCase().split(',').map(i => i.trim());
    let alternatives = [];
    
    ingredients.forEach(ingredient => {
      Object.keys(alternativeProducts).forEach(key => {
        if (ingredient.includes(key)) {
          alternatives = [...alternatives, ...alternativeProducts[key]];
        }
      });
    });

    // Remove duplicates if any
    return Array.from(new Set(alternatives.map(a => JSON.stringify(a))))
      .map(item => JSON.parse(item));
  };

  const analyzeInput = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
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
      setResult("Unable to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="header">Beauty Advisor</h1>
        
        {previewImage && (
          <div className="image-section">
            <img 
              src={previewImage} 
              alt="Analyzed product" 
              className="analyzed-image"
            />
          </div>
        )}

        <form onSubmit={analyzeInput} className="form">
          <input
            type="text"
            placeholder={analysisType === "ingredient" 
              ? "Enter skincare ingredient to analyze..." 
              : "Enter beauty remedy to analyze..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
            className="input-text"
          />

          <div className="skin-type-group">
            <label className="skin-type-label">Your Skin Type:</label>
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
              ✨ Analyze Product
            </button>
            <button
              type="button"
              onClick={() => setAnalysisType("remedy")}
              className={`button ${analysisType === "remedy" ? "active" : ""}`}
            >
              🌿 Natural Remedy
            </button>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
            title="Upload product image"
          />

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Analyzing...
              </>
            ) : (
              "Get Professional Advice"
            )}
          </button>
        </form>

        {result && (
          <div className="result-box">
            <div className="ingredient-summary">
              <div className="summary-header">
                <h2 className="result-header" style={{ margin: 0 }}>Ingredient Analysis</h2>
              </div>

              {riskLevel && (
                <div className="risk-level">
                  {(() => {
                    const info = getRiskLevelInfo();
                    return info ? (
                      <>
                        <div className={`risk-indicator ${info.className}`}>
                          {info.icon}
                        </div>
                        <div className="risk-details">
                          <div className="risk-title">{info.title}</div>
                          <div className="risk-description">{info.description}</div>
                        </div>
                      </>
                    ) : null;
                  })()}
                </div>
              )}

              <div className="markdown-container">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>

              {riskLevel && riskLevel !== "Safe" && (
                <>
                  <h3 className="result-header" style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
                    Safer Alternatives 🌱
                  </h3>
                  <div className="alternatives-grid">
                    {getAlternatives().map((product, index) => (
                      <div key={index} className="alternative-card">
                        <div className="alternative-image-container">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="alternative-image"
                          />
                        </div>
                        <div className="alternative-info">
                          <div className="alternative-name">{product.name}</div>
                          <div className="alternative-type">{product.type}</div>
                          <div className="alternative-ingredient">
                            Contains: {product.safeIngredient}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h3 className="result-header" style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
                About this product
              </h3>
              
              <div className="features-grid">
                {getProductFeatures().positive.map((feature, index) => (
                  <div key={index} className="feature-badge positive">
                    <i>✓</i>
                    {feature}
                  </div>
                ))}
                {getProductFeatures().negative.map((feature, index) => (
                  <div key={index} className="feature-badge negative">
                    <i>✕</i>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
