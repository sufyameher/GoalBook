import dotenv from "dotenv";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
    try {
      const { prompt } = req.body;
  

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const response = await genAI.generateText({
        model: "gemini-1.5-flash", 
        prompt,                // Pass the dynamic prompt here
        temperature: 0.7,      
        maxTokens: 200,       
      });
  
      res.json({ generatedText: response?.data?.content });
    } catch (error) {
      console.error("Error generating text:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});