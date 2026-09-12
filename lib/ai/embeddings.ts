/**
 * Centralized Google Gemini Embedding Utility
 * Generates vector embeddings for pgvector RAG semantic search.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!text || !text.trim()) {
    throw new Error("Input text is required to generate vector embedding.");
  }

  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }

  const cleanText = text.replace(/\s+/g, " ").trim();

  // Primary model: gemini-embedding-001 with outputDimensionality 1536
  const modelsToTry = [
    "gemini-embedding-001",
    "text-embedding-004",
    "gemini-embedding-2-preview"
  ];

  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: { parts: [{ text: cleanText }] },
          outputDimensionality: 1536
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        lastError = new Error(`Gemini embed API error (${model}): ${res.status} ${errorText}`);
        continue;
      }

      const data = await res.json();
      const rawValues: number[] = data.embedding?.values;

      if (!rawValues || rawValues.length === 0) {
        lastError = new Error(`No embedding vector returned by model ${model}`);
        continue;
      }

      // If dimensions are 768, zero-pad to 1536 to match PostgreSQL VECTOR(1536)
      if (rawValues.length === 768) {
        return rawValues.concat(new Array(768).fill(0));
      }

      // If dimensions match 1536 exactly
      if (rawValues.length === 1536) {
        return rawValues;
      }

      // If dimensions are larger (e.g. 3072), slice to 1536
      if (rawValues.length > 1536) {
        return rawValues.slice(0, 1536);
      }

      // Otherwise pad to 1536
      const padded = [...rawValues];
      while (padded.length < 1536) padded.push(0);
      return padded;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to generate vector embedding across all available Gemini models.");
}
