const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBateRFg2GDw1njK2DaM_Nbvo7gC78G4jM",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();
