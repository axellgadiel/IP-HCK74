import React from "react";
import Navbar from "../components/Navbar";
import video from "../assets/bgimage.mp4";
import axios from "axios";

export default function Home() {
  const handleFluxAi = async () => {
    const [result, setResult] = useState(null);
    try {
      const response = await axios.post({
        method: "post",
        url: "http://localhost:3001/api/generate",
        // headers: {
        //     Authorization: "Bearer " + localStorage.access_token,
        //   },
        input: {
          prompt: prompt,
        },
      });

      setResult(response.data);
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  const handleGeminiAi = async () => {
    const [result, setResult] = useState(null);
    try {
      const response = await axios.post({
        method: "post",
        url: "http://localhost:3001/api-g/generate",
        // headers: {
        //     Authorization: "Bearer " + localStorage.access_token,
        //   },
      });

      setResult(response.data);
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Video Background */}
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

      {/* Overlay to darken the video */}
      <div className="absolute inset-0 bg-black opacity-0"></div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Main Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Input Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Input</h2>

          {/* Prompt Input */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prompt
          </label>
          <textarea
            value={prompt} //
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 mb-4"
            rows="4"
            placeholder='example: black forest gateau cake spelling out the words "FLUX SCHNELL", tasty, food photography, dynamic shot'
          ></textarea>

          {/* Aspect Ratio */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aspect Ratio
          </label>
          <select className="w-full border border-gray-300 rounded-md p-3 mb-4">
            <option value="1:1">1:1</option>
            <option value="16:9">16:9</option>
            <option value="4:3">4:3</option>
          </select>

          {/* Number of Outputs */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Outputs
          </label>
          <input
            type="number"
            min="1"
            max="4"
            className="w-full border border-gray-300 rounded-md p-3 mb-4"
            defaultValue={1}
          />

          {/* Output Format */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Output Format
          </label>
          <select className="w-full border border-gray-300 rounded-md p-3 mb-4">
            <option value="webp">webp</option>
            <option value="png">png</option>
            <option value="jpg">jpg</option>
          </select>

          {/* Submit Button */}
          <button
            // onClick={handleGenerate}
            className="bg-black text-white w-full py-3 rounded-md font-semibold"
          >
            Generate Image
          </button>
        </div>

        {/* Right: Output */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Output</h2>

          {/* Image Output */}
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/300"
              alt="Generated output"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Output Details */}
          <div className="mt-4">
            <button className="text-blue-600 hover:underline"></button>
          </div>
        </div>
      </main>
    </div>
  );
}
