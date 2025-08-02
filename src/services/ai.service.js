require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.

const ai = new GoogleGenAI({});

const generateCaption = async base64ImageFile => {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    {
      text: `Generate a short, engaging Instagram-style caption for this image. 
      Make it natural, human-like, and relatable — just like a real Instagram user would post. 
      Include 3 to 5 relevant and trending hashtags (max) and 1 to 3 suitable emojis. 
      Avoid guessing things that are not visible in the image. No long stories, just  short sentence captions.`,
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction:
        "You are a social media expert and creative assistant that writes engaging, trendy, and realistic Instagram captions. Captions should be short, natural, and reflect what is visible in the image only. Include suitable hashtags and emojis without exaggeration or hallucination.",
    },
  });

  return response.text;
};

module.exports = generateCaption;
