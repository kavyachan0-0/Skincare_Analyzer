// server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pool from './src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyCnUKJlm4YHEHBPH-CyxcwpzTDIYMaDtaw";

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  }
};

testConnection();

// Get all ingredient history
app.get("/history", async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ingredients_history ORDER BY created_at DESC');
    console.log('Successfully fetched history:', rows.length, 'records');
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

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

    // Store the analysis in the database
    await pool.query(
      'INSERT INTO ingredients_history (ingredient_list, analysis_result) VALUES (?, ?)',
      [prompt, text]
    );
    console.log('Successfully stored analysis in database');

    res.json({ result: text });

  } catch (error) {
    console.error("❌ Error:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response Data:", error.response.data);
    } else {
      console.error("Error details:", error);
    }
    res.status(500).json({ error: "Failed to process request" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});