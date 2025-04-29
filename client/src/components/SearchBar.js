import React, { useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    const modelName = "gemini-1.5-pro";

    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setAiResult("");
    setError("");

    const prompt = `
    You are an expert in country and region codes.
    
    Given a user query, provide:
    - Country Code (ISO Alpha-2 preferred, Alpha-3 if necessary)
    - Region or State Code (only the local region code, without the country code prefix)
    
    Example:
    - For India and Assam: Country Code - IN, state Code - AS
    - For USA and California: Country Code - US, state Code - CA
    
    Do not include the country code in the region/state code.
    Keep the response short, clear, and structured.
  
  Query: ${input}
  
  Answer:`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response from API");
      }

      const data = await response.json();
      const generatedText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      setAiResult(generatedText);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-4 px-4 max-w-2xl mx-auto">
      <div className="w-full">
        <p className="text-center text-xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          You can search for a country code and its corresponding region code to
          get relevant information.
        </p>

        <form onSubmit={handleSearch} className="w-full">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search for country and region code, or ask your query here"
              className="w-full py-2 px-4 text-lg rounded-xl border-2 border-gray-300 bg-white placeholder-gray-500 focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition duration-300"
            />
            <div className="absolute top-0 right-0 mt-3 mr-4 text-gray-500 opacity-50">
              <span className="material-icons">search</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-1/2 py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
            disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {aiResult && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              AI Response:
            </h3>
            <p>{aiResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
