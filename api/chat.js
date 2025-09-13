import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN); // ضع التوكن من Hugging Face

export default async function handler(req, res) {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await hf.textGeneration({
      model: "tiiuae/falcon-7b-instruct",
      inputs: message,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
      },
    });

    res.status(200).json({ reply: response.generated_text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}