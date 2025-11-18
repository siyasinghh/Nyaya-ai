document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("legalQuery").value.trim();
  const resultBox = document.getElementById("response");

  if (!query) {
    resultBox.textContent = "⚠️ Please enter a legal question or query.";
    return;
  }

  resultBox.textContent = "⏳ Analyzing your query with Nyaya Drishti...";

  const prompt = `
You are Nyaya Drishti — an AI-powered Indian legal research assistant.
The user will ask a question related to Indian law, judgments, or sections.
Provide:
1. A clear summary or interpretation.
2. Relevant IPC / CrPC / Constitution articles or laws (if applicable).
3. Keep it concise, factual, and neutral.

User's Query: "${query}"
`;

  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    // Safely handle text
    if (data.reply) {
      resultBox.innerHTML = data.reply.replace(/\n/g, "<br>");
    } else {
      resultBox.textContent = "❌ No reply received from Gemini.";
    }
  } catch (error) {
    console.error(error);
    resultBox.textContent = "❌ Something went wrong fetching the answer.";
  }
});