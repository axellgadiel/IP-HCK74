const fal = require("@fal-ai/serverless-client");
const { GoogleGenerativeAI } = require("@google/generative-ai");

fal.config({
  credentials: process.env.FAL_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class ApiController {
  static async fluxAi(req, res, next) {
    try {
      const result = await fal.subscribe("fal-ai/flux/schnell", {
        input: {
          prompt: "Sunset over a starry ocean.",
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async geminiAi(req, res, next) {
    try {
      const prompt =
        "give a simple prompt (max 10 words), so that i can generate an image based on the prompt";

      const result = await model.generateContent(prompt);
      res.send(result.response.text());
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ApiController;
