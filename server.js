// server.js
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyCnUKJlm4YHEHBPH-CyxcwpzTDIYMaDtaw";


app.post("/analyze", async (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    res.json({ result: text });

  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Response Data:", error.response?.data);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});