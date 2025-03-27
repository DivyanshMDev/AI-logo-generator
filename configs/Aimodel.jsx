
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const AIDesignIdea = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : Indian\nSpice with description: Indian Restaurant and referring to prompt: A vibrant logo featuring a friendly, animated character\nwith a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds\npersonality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—\nsuch as small decorative touches or natural accents—enhance the overall look. The background consists of a bold,\ncircular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized\nlettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character..\nGive me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"ideas\": [\n    \"Spiced Elephant Chef Mascot\",\n    \"Curry King Tiger Character\",\n    \"Masala Monkey Spice Grinder\",\n    \"Chili Parrot Flavor Burst\",\n    \"Saffron Snake Dish Swirl\"\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
