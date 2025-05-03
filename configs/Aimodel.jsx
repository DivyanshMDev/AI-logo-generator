
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_KEY;
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

   export const AILogoPrompt = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a text prompt to create Logo for Logo Title/Brand name : Hulk},with description: Power and Blast}, with Color combination of Forest Greens}, also include the Hulk Smash Retro Emblem} and include Vintage Logo Designs With Text & Icon} design idea and Referring to this Logo Prompt:Design a collection of vintage-inspired logos with a hand-drawn, artistic style. Incorporate a variety of themes, including food, animals, characters, and unique brand elements. Each logo should feature bold typography, intricate details, and a retro aesthetic that is versatile and suitable for diverse brands or businesses.}  Give me result in JSON portal with prompt field only"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"prompt\": \"Create a vintage logo design for the brand \\\"Hulk\\\" with the theme of \\\"Power and Blast\\\". The logo should incorporate a color combination of Forest Greens. Include a retro emblem reminiscent of the \\\"Hulk Smash\\\" action. Emphasize a hand-drawn, artistic style with bold typography and intricate details. The overall aesthetic should be vintage and versatile, suitable for a brand conveying strength and impact. Consider the style of vintage logos featuring text and icons. Reference hand-drawn vintage logo designs with themes of characters and unique brand elements, ensuring a retro aesthetic that's bold and detailed, adaptable for a variety of brands.\"\n}\n```\n"},
          ],
        },
      ],
    });
  
