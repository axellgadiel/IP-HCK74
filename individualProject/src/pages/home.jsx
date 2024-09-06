import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import video from "../assets/bgimage.mp4";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [geminiPrompt, setGeminiPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/api/generate",
        data: { prompt: prompt },
      });
      console.log("Response:", response);
      setImgUrl(response.data.image);
    } catch (err) {
      console.error("Error details:", err.response || err);
      setError("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeminiAi = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3001/api-g/generate",
        { prompt: geminiPrompt }
      );
      setResult(response.data);
      setPrompt(response.data);
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black opacity-0"></div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Input</h2>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              rows="4"
              placeholder='example: black forest gateau cake spelling out the words "FLUX SCHNELL", tasty, food photography, dynamic shot'
              required
            ></textarea>

            <button
              type="submit"
              className="bg-black text-white w-full py-3 rounded-md font-semibold mb-2"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </form>

          <form onSubmit={handleGeminiAi}>
            <h2 className="text-lg font-semibold mb-1">Gemini AI</h2>
            <label className="block text-sm font-medium p-3 text-gray-700 mb-2">
              Use Gemini AI to generate simple prompts
            </label>
            {(e) => setGeminiPrompt(e.target.value)}
            <button
              type="submit"
              className="bg-black text-white w-full py-3 rounded-md font-semibold"
              disabled={loading}
            >
              Generate Prompt
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center h-full">
          <h2 className="text-lg font-semibold mb-4">Output</h2>

          <div className="flex justify-center items-center">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt="Generated output"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            ) : (
              <img
                src="https://via.placeholder.com/300"
                alt="Placeholder"
                className="rounded-lg shadow-lg"
              />
            )}
          </div>

          {loading && <p className="text-center mt-4">Generating image...</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {result && (
            <div className="mt-4 text-center">
              <h3 className="font-semibold"> Result:</h3>
              <p>{result}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
