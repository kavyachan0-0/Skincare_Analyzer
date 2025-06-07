import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Tesseract from "tesseract.js";
import "../App.css";

// Sample recommendation data
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

// Sample alternative products data
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

// Product image collections
const productImages = {
  toner: [
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
    "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400"
  ],
  serum: [
    "https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?w=400",
    "https://images.unsplash.com/photo-1612532774276-cfa70c72b901?w=400"
  ],
  moisturizer: [
    "https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=400",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400"
  ],
  mask: [
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400",
    "https://images.unsplash.com/photo-1617897903246-719242758050?w=400"
  ],
  cleanser: [
    "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400",
    "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400"
  ],
  treatment: [
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
    "https://images.unsplash.com/photo-1592136957897-b2b6ca21e10d?w=400"
  ],
  natural: [
    "https://images.unsplash.com/photo-1587049352847-4a22f997d6d1?w=400",
    "https://images.unsplash.com/photo-1604239128597-baad42a29f43?w=400"
  ]
};

// Analysis categories
const ingredientCategories = {
  hydrating: ["hyaluronic acid", "glycerin", "aloe", "ceramides", "panthenol", "urea"],
  exfoliating: ["glycolic acid", "lactic acid", "salicylic acid", "mandelic acid", "pha", "bha", "aha"],
  brightening: ["vitamin c", "niacinamide", "kojic acid", "alpha arbutin", "azelaic acid"],
  soothing: ["centella asiatica", "green tea", "chamomile", "allantoin", "madecassoside"],
  antioxidants: ["vitamin e", "vitamin c", "ferulic acid", "resveratrol", "coq10"],
  retinoids: ["retinol", "retinal", "retinyl", "adapalene", "tretinoin"],
  peptides: ["peptide", "matrixyl", "argireline", "copper peptides"],
  occlusives: ["petrolatum", "dimethicone", "mineral oil", "shea butter"],
  preservatives: ["phenoxyethanol", "parabens", "benzyl alcohol", "potassium sorbate"],
  problematic: ["alcohol denat", "fragrance", "essential oil", "witch hazel", "menthol", "citrus"]
};

const benefitDescriptions = {
  hydrating: "Helps maintain skin moisture and strengthen barrier function",
  exfoliating: "Removes dead skin cells and unclogs pores",
  brightening: "Helps even skin tone and reduce dark spots",
  soothing: "Calms irritation and reduces redness",
  antioxidants: "Protects against environmental damage",
  retinoids: "Promotes cell turnover and collagen production",
  peptides: "Supports skin firmness and repair",
  occlusives: "Creates a protective barrier to prevent moisture loss",
  preservatives: "Ensures product stability and safety",
  problematic: "May cause irritation or sensitivity in some skin types"
};

const skinConcerns = {
  acne: ["salicylic acid", "benzoyl peroxide", "niacinamide", "tea tree"],
  aging: ["retinol", "peptides", "vitamin c", "coq10", "ceramides"],
  pigmentation: ["vitamin c", "kojic acid", "alpha arbutin", "niacinamide"],
  sensitivity: ["centella asiatica", "allantoin", "madecassoside", "green tea"],
  dryness: ["hyaluronic acid", "ceramides", "squalane", "glycerin"],
  oiliness: ["niacinamide", "salicylic acid", "zinc", "kaolin"]
};

function Analyzer() {
  const [inputText, setInputText] = useState("");
  const [analysisType, setAnalysisType] = useState("ingredient");
  const [skinType, setSkinType] = useState("normal");
  const [result, setResult] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [ingredientBreakdown, setIngredientBreakdown] = useState({});
  const [skinBenefits, setSkinBenefits] = useState([]);
  const [concerns, setConcerns] = useState([]);

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

    if (ingredients.some(i => i.includes('alcohol'))) {
      features.negative.push('Contains Alcohol 🍷');
    } else {
      features.positive.push('Alcohol-free ✨');
    }

    if (ingredients.some(i => i.includes('acid'))) {
      features.negative.push('Contains Acids 🧪');
    }

    if (ingredients.some(i => ['honey', 'aloe', 'tea'].includes(i))) {
      features.positive.push('Contains Natural Ingredients 🌿');
    }

    if (ingredients.some(i => ['lemon', 'orange', 'lime', 'citrus'].includes(i))) {
      features.negative.push('Contains Citrus 🍋');
    }

    if (ingredients.some(i => ['coconut oil', 'lanolin', 'mineral oil'].includes(i))) {
      features.negative.push('May Clog Pores 🕳️');
    } else {
      features.positive.push('Non-Comedogenic 👌');
    }

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
          className: "risk-safe",
          gradient: "linear-gradient(45deg, #4CAF50, #81C784)"
        };
      case "Caution":
        return {
          icon: "⚠️",
          title: "Use with Professional Guidance",
          description: "This ingredient may require careful use and professional consultation.",
          className: "risk-caution",
          gradient: "linear-gradient(45deg, #FFA726, #FFB74D)"
        };
      case "Harmful":
        return {
          icon: "⛔",
          title: "Not Recommended",
          description: "This ingredient might be harmful or irritating for your skin type.",
          className: "risk-harmful",
          gradient: "linear-gradient(45deg, #E53935, #EF5350)"
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

    return Array.from(new Set(alternatives.map(a => JSON.stringify(a))))
      .map(item => JSON.parse(item));
  };

  const getProductImage = (type) => {
    type = type.toLowerCase();
    let category = 'treatment';

    if (type.includes('toner') || type.includes('lotion')) {
      category = 'toner';
    } else if (type.includes('serum') || type.includes('solution')) {
      category = 'serum';
    } else if (type.includes('moisturizer') || type.includes('cream')) {
      category = 'moisturizer';
    } else if (type.includes('mask') || type.includes('pack')) {
      category = 'mask';
    } else if (type.includes('cleanser') || type.includes('wash')) {
      category = 'cleanser';
    } else if (type.includes('natural') || type.includes('remedy')) {
      category = 'natural';
    }

    const images = productImages[category];
    return images[Math.floor(Math.random() * images.length)];
  };

  const analyzeIngredientComposition = (ingredients) => {
    const breakdown = {};
    const benefits = new Set();
    const potentialConcerns = new Set();

    const ingredientList = ingredients.toLowerCase()
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);

    ingredientList.forEach(ingredient => {
      Object.entries(ingredientCategories).forEach(([category, keywords]) => {
        if (keywords.some(keyword => ingredient.includes(keyword))) {
          if (!breakdown[category]) {
            breakdown[category] = [];
          }
          breakdown[category].push(ingredient);
          benefits.add(benefitDescriptions[category]);
        }
      });

      Object.entries(skinConcerns).forEach(([concern, ingredients]) => {
        if (ingredients.some(i => ingredient.includes(i))) {
          potentialConcerns.add(concern);
        }
      });
    });

    return {
      breakdown,
      benefits: Array.from(benefits),
      concerns: Array.from(potentialConcerns)
    };
  };

  const analyzeInput = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setLoading(true);
    setResult("");
    setRiskLevel("");
    setIngredientBreakdown({});
    setSkinBenefits([]);
    setConcerns([]);

    let prompt = "";

    if (analysisType === "ingredient") {
      prompt = `Analyze this skincare ingredient/product: ${inputText}. 
Provide a comprehensive analysis for someone with ${skinType} skin.

Please format your response EXACTLY as follows:

Analysis:
1. Safety Profile:
   A. Overall Safety Rating:
      - EWG Safety Score (if available)
      - FDA approval status
      - European Union compliance
      - International safety standards

   B. Potential Concerns:
      - Common allergens present
      - Irritation potential
      - Photosensitivity risks
      - Long-term safety data

   C. Concentration Guidelines:
      - Safe concentration range
      - Maximum recommended %
      - pH level requirements
      - Formula stability factors

2. Main Benefits:
   A. Primary Functions:
      - Key skin benefits
      - Active mechanisms
      - Cellular effects
      - Skin barrier impact

   B. Target Concerns:
      - Specific skin issues addressed
      - Age-related benefits
      - Skin type suitability
      - Problem-solving capabilities

   C. Results Timeline:
      - Immediate effects
      - Short-term benefits
      - Long-term improvements
      - Maintenance requirements

3. Scientific Evidence:
   A. Research Background:
      - Key studies and findings
      - Clinical trial results
      - Peer-reviewed research
      - Industry validation

   B. Effectiveness Data:
      - Success rates
      - Comparative studies
      - User satisfaction data
      - Professional endorsements

   C. Innovation Status:
      - Latest developments
      - Technological advances
      - Formulation improvements
      - Future potential

4. Usage Guidelines:
   A. Application Protocol:
      - Step-by-step instructions
      - Time of day recommendations
      - Frequency of use
      - Application techniques

   B. Product Integration:
      - Layering order
      - Wait times between products
      - Product combinations
      - Routine optimization

   C. Environmental Considerations:
      - Climate factors
      - Seasonal adjustments
      - Travel considerations
      - Storage requirements

5. Precautions:
   A. Risk Factors:
      - Skin sensitivity warnings
      - Medical conditions
      - Pregnancy safety
      - Age restrictions

   B. Side Effects:
      - Common reactions
      - Rare complications
      - Warning signs
      - Emergency measures

   C. Environmental Impact:
      - Sun exposure guidelines
      - Weather considerations
      - Activity restrictions
      - Climate adaptations

6. Interactions:
   A. Positive Combinations:
      - Synergistic ingredients
      - Boosting effects
      - Recommended pairings
      - Enhancement strategies

   B. Negative Interactions:
      - Conflicting ingredients
      - Neutralizing effects
      - Harmful combinations
      - Timing conflicts

   C. Routine Integration:
      - Morning vs night use
      - Treatment scheduling
      - Product spacing
      - Routine adjustments

Risk Level: [MUST be exactly one of: Safe, Caution, or Harmful]

Alternative Products:
1. [Product Name] - [Product Type] - [Key Safe Ingredient] - [Main Benefit] - [Unique Feature]
2. [Product Name] - [Product Type] - [Key Safe Ingredient] - [Main Benefit] - [Unique Feature]
3. [Product Name] - [Product Type] - [Key Safe Ingredient] - [Main Benefit] - [Unique Feature]`;
    } else {
      prompt = `Analyze this home remedy: ${inputText}. 
Provide a detailed analysis for someone with ${skinType} skin.

Please format your response EXACTLY as follows:

Analysis:
1. Traditional Background:
   A. Historical Context:
      - Origin and history
      - Cultural significance
      - Traditional medicine systems
      - Evolution of use

   B. Traditional Applications:
      - Historical uses
      - Cultural variations
      - Traditional preparations
      - Folk medicine practices

   C. Documented Benefits:
      - Traditional claims
      - Historical effectiveness
      - Cultural wisdom
      - Generation knowledge

2. Scientific Analysis:
   A. Active Components:
      - Key compounds
      - Beneficial elements
      - Chemical composition
      - Bioactive properties

   B. Mechanism of Action:
      - Skin interaction
      - Absorption process
      - Cellular effects
      - Biological pathways

   C. Research Support:
      - Scientific studies
      - Clinical trials
      - Laboratory findings
      - Research limitations

3. Safety Assessment:
   A. Risk Analysis:
      - Common side effects
      - Allergic potential
      - Contamination risks
      - Quality variations

   B. Skin Reactions:
      - Sensitivity issues
      - Irritation patterns
      - Adverse reactions
      - Individual variations

   C. Quality Factors:
      - Source importance
      - Preparation impact
      - Storage effects
      - Contamination risks

4. Application Protocol:
   A. Preparation Method:
      - Ingredient selection
      - Processing steps
      - Quality checks
      - Storage guidelines

   B. Usage Instructions:
      - Application technique
      - Timing considerations
      - Frequency guidelines
      - Duration limits

   C. Best Practices:
      - Optimal conditions
      - Hygiene requirements
      - Tool sterilization
      - Environmental factors

5. Results Analysis:
   A. Expected Outcomes:
      - Short-term effects
      - Long-term benefits
      - Visible changes
      - Healing progression

   B. Success Factors:
      - Key determinants
      - Optimal conditions
      - Impact variables
      - Enhancement methods

   C. Limitations:
      - Effectiveness bounds
      - Result variations
      - Time constraints
      - Individual factors

6. Safety Guidelines:
   A. Contraindications:
      - Medical conditions
      - Skin types
      - Age restrictions
      - Pregnancy concerns

   B. Warning Signs:
      - Red flags
      - Adverse reactions
      - Emergency signals
      - When to stop

   C. Professional Advice:
      - When to consult
      - Expert opinions
      - Medical oversight
      - Alternative options

Risk Level: [MUST be exactly one of: Safe, Caution, or Harmful]

Alternative Remedies:
1. [Remedy Name] - [Natural Remedy Type] - [Key Natural Ingredient] - [Main Benefit] - [Traditional Use]
2. [Remedy Name] - [Natural Remedy Type] - [Key Natural Ingredient] - [Main Benefit] - [Traditional Use]
3. [Remedy Name] - [Natural Remedy Type] - [Key Natural Ingredient] - [Main Benefit] - [Traditional Use]`;
    }

    try {
      const response = await axios.post("http://localhost:5000/analyze", { prompt });
      const text = response.data.result;
      
      const sections = text.split('\n\n');
      let analysis = '';
      let riskLevel = '';
      let alternativesText = '';

      for (const section of sections) {
        if (section.trim().startsWith('Analysis:')) {
          analysis = section.replace('Analysis:', '').trim();
        } else if (section.trim().startsWith('Risk Level:')) {
          riskLevel = section.replace('Risk Level:', '').trim();
        } else if (section.trim().startsWith('Alternative')) {
          alternativesText = section;
        }
      }

      if (!['Safe', 'Caution', 'Harmful'].includes(riskLevel)) {
        console.warn('Unexpected risk level:', riskLevel);
        riskLevel = 'Caution';
      }

      const alternatives = alternativesText
        .split('\n')
        .filter(line => line.trim().match(/^\d\./))
        .map(line => {
          const [name, type, ingredient, benefit, unique] = line.replace(/^\d\./, '').split('-').map(s => s.trim());
          return {
            name,
            type,
            safeIngredient: ingredient,
            benefit: benefit || '',
            uniqueFeature: unique || '',
            image: getProductImage(type)
          };
        });

      const { breakdown, benefits, concerns } = analyzeIngredientComposition(inputText);
      
      setResult(analysis);
      setRiskLevel(riskLevel);
      setAlternatives(alternatives);
      setIngredientBreakdown(breakdown);
      setSkinBenefits(benefits);
      setConcerns(concerns);
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
                <h2 className="result-header" style={{ margin: 0 }}>Comprehensive Analysis</h2>
              </div>

              <div className="risk-level-container">
                {(() => {
                  const info = getRiskLevelInfo();
                  return info ? (
                    <div 
                      className={`risk-level-card ${info.className}`} 
                      style={{
                        background: '#fff',
                        borderRadius: '15px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 15px rgba(156, 39, 176, 0.1)',
                        border: '1px solid #e1bee7',
                        marginBottom: '2rem'
                      }}
                    >
                      <div 
                        className="risk-level-header" 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1rem'
                        }}
                      >
                        <div 
                          className="risk-icon" 
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: info.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          {info.icon}
                        </div>
                        <div 
                          className="risk-title" 
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: '#9c27b0'
                          }}
                        >
                          {info.title}
                        </div>
                      </div>
                      <div 
                        className="risk-description" 
                        style={{
                          color: '#666',
                          lineHeight: '1.6',
                          fontSize: '0.95rem',
                          paddingLeft: '4rem'
                        }}
                      >
                        {info.description}
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>

              {Object.keys(ingredientBreakdown).length > 0 && (
                <div className="ingredient-breakdown">
                  <h3>Ingredient Composition</h3>
                  {Object.entries(ingredientBreakdown).map(([category, ingredients]) => (
                    <div key={category} className="ingredient-category">
                      <h4>{category.charAt(0).toUpperCase() + category.slice(1)} Ingredients:</h4>
                      <ul>
                        {ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {skinBenefits.length > 0 && (
                <div className="skin-benefits">
                  <h3>Key Benefits</h3>
                  <ul>
                    {skinBenefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="markdown-container">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>

              <h3 className="result-header" style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
                Product Characteristics
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

              {riskLevel && riskLevel !== "Safe" && (
                <>
                  <h3 className="result-header" style={{ fontSize: "1.2rem", marginTop: "2rem" }}>
                    Safer Alternatives 🌱
                  </h3>
                  <div className="alternatives-grid">
                    {alternatives.map((product, index) => (
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
                            Key Ingredient: {product.safeIngredient}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analyzer; 