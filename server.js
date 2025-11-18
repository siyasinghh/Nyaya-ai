import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "public")));

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// API route for Gemini (Legal Search / Summarizer)
app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // ✅ valid model
      contents: [{ text: prompt }],
    });

    // Extract the reply safely
    let reply = "No response from Gemini";

    const candidate = response?.candidates?.[0];
    if (candidate && candidate.content?.parts?.length > 0) {
      reply = candidate.content.parts.map((p) => p.text).join("\n");
    } else if (response?.output_text) {
      reply = response.output_text;
    }

    res.json({ reply });
  } catch (error) {
    console.error("Error from Gemini API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Catch-all route: serve index.html for any non-API route
app.use((req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    next();
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("API Key Loaded:", !!process.env.GEMINI_API_KEY);
});