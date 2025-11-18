document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const text = document.getElementById("legalText").value.trim();
  const summaryBox = document.getElementById("summary");

  if (!text) {
    summaryBox.textContent = "⚠️ Please enter some legal text to summarize.";
    return;
  }

  summaryBox.textContent = "⏳ Summarizing...";

  const prompt = `
You are Nyaya Drishti, an AI legal assistant.
Summarize the following legal text concisely, highlighting the main points, important judgments, and relevant laws. Do not omit critical legal details.

Text:
${text}
`;

  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();

    if (data.reply) {
      summaryBox.innerHTML = data.reply.replace(/\n/g, "<br>");
    } else {
      summaryBox.textContent = "❌ No summary received.";
    }
  } catch (err) {
    console.error(err);
    summaryBox.textContent = "❌ Error fetching summary from Gemini.";
  }
});
