import { profileIndex } from "./profile-index.js";

const ALLOWED_ORIGINS = [
  "https://smhejazihoseini.github.io",
  "https://smohammadhejazi.github.io"
];

const MAX_MESSAGE_LENGTH = 1200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const EMBEDDING_MODEL = "text-embedding-3-small";
const RESPONSE_MODEL = "gpt-5-mini";
const MAX_RETRIEVED_CHUNKS = 6;
const MIN_CONFIDENT_SCORE = 0.35;

const ipHits = new Map();

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "do", "for", "from", "how",
  "i", "in", "is", "it", "me", "my", "of", "on", "or", "so", "tell", "that",
  "the", "to", "what", "when", "where", "which", "who", "why", "with", "you",
  "your", "about", "please", "can", "could", "would"
]);

const SECTION_KEYWORDS = {
  bio: [
    "who are you",
    "about you",
    "about yourself",
    "introduce yourself",
    "background",
    "profile"
  ],
  experience: [
    "experience",
    "work experience",
    "work",
    "job",
    "jobs",
    "professional",
    "employment",
    "internship",
    "intern",
    "research assistant",
    "teaching assistant",
    "assistantship"
  ],
  contact: [
    "contact",
    "email",
    "phone",
    "reach",
    "call",
    "message"
  ],
  links: [
    "github",
    "linkedin",
    "website",
    "portfolio",
    "site",
    "link",
    "links"
  ],
  education: [
    "education",
    "study",
    "studied",
    "school",
    "university",
    "degree",
    "master",
    "masc",
    "bachelor",
    "bsc",
    "york",
    "amirkabir",
    "high school"
  ],
  research_interests: [
    "research interests",
    "research interest",
    "interests",
    "focus",
    "focused on",
    "areas",
    "specialize",
    "specialise"
  ],
  research_experience: [
    "research",
    "thesis",
    "paper",
    "papers",
    "publication",
    "publications",
    "reproducibility",
    "swe-bench",
    "recommendation system",
    "smart grid",
    "wireless network",
    "llm",
    "vllm",
    "llama.cpp"
  ],
  selected_projects: [
    "project",
    "projects",
    "built",
    "developed",
    "made",
    "portfolio",
    "app",
    "tool",
    "system",
    "implementation"
  ],
  teaching_assistant_experience: [
    "teaching assistant",
    "ta",
    "teaching",
    "tutorial",
    "grader",
    "grading",
    "lab demonstrator",
    "invigilator",
    "course assistant"
  ],
  skills: [
    "skills",
    "skill",
    "technologies",
    "technology",
    "tech stack",
    "stack",
    "programming",
    "languages",
    "tools",
    "frameworks",
    "libraries",
    "databases",
    "software"
  ],
  languages: [
    "language",
    "languages",
    "english",
    "persian",
    "farsi",
    "toefl"
  ],
  honors_awards: [
    "award",
    "awards",
    "honor",
    "honours",
    "achievement",
    "achievements",
    "distinction",
    "rank",
    "entrance exam",
    "nodet"
  ],
  related_courses: [
    "course",
    "courses",
    "coursework",
    "class",
    "classes",
    "studied",
    "relevant coursework"
  ]
};

export default {
  async fetch(request, env) {
    const requestOrigin = request.headers.get("Origin");
    const corsHeaders = buildCorsHeaders(requestOrigin);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === "GET") {
      return jsonResponse(
        {
          ok: true,
          message: "Profile chatbot worker is running."
        },
        200,
        corsHeaders
      );
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
    }

    if (requestOrigin && !ALLOWED_ORIGINS.includes(requestOrigin)) {
      return jsonResponse({ error: "Forbidden origin" }, 403, corsHeaders);
    }

    try {
      if (!env.OPENAI_API_KEY) {
        return jsonResponse(
          { error: "Missing OPENAI_API_KEY secret in worker environment" },
          500,
          corsHeaders
        );
      }

      const ip = getClientIp(request);
      const rate = checkRateLimit(ip);

      if (!rate.allowed) {
        return jsonResponse(
          {
            error: "Too many requests",
            retry_after_seconds: rate.retryAfterSeconds
          },
          429,
          corsHeaders
        );
      }

      const body = await request.json();
      const message = body?.message;

      if (!message || typeof message !== "string") {
        return jsonResponse({ error: "Missing message" }, 400, corsHeaders);
      }

      const trimmedMessage = message.trim();

      if (!trimmedMessage) {
        return jsonResponse({ error: "Missing message" }, 400, corsHeaders);
      }

      if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
        return jsonResponse({ error: "Message too long" }, 400, corsHeaders);
      }

      const queryEmbedding = await embedQuery(trimmedMessage, env.OPENAI_API_KEY);
      const ranked = rankChunks(trimmedMessage, queryEmbedding);
      const retrieved = selectRetrievedChunks(ranked);

      const instructions = buildInstructions(retrieved);

      const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: RESPONSE_MODEL,
          store: false,
          instructions,
          input: trimmedMessage,
          text: {
            format: {
              type: "text"
            }
          },
          max_output_tokens: 500
        })
      });

      const data = await openaiResponse.json();

      if (!openaiResponse.ok) {
        console.log("OpenAI responses API error:");
        console.log(JSON.stringify(data, null, 2));

        return jsonResponse(
          {
            error: "OpenAI request failed",
            details: data
          },
          openaiResponse.status,
          corsHeaders
        );
      }

      const reply = extractText(data);

      if (!reply) {
        console.log("OpenAI response had no extracted text:");
        console.log(JSON.stringify(data, null, 2));

        return jsonResponse(
          {
            error: "Model returned no text output",
            status: data?.status || null,
            incomplete_details: data?.incomplete_details || null
          },
          502,
          corsHeaders
        );
      }

      return jsonResponse(
        {
          reply,
          sources: retrieved.map((entry) =>
            toSourceCard(entry.chunk, entry.finalScore)
          )
        },
        200,
        corsHeaders
      );
    } catch (error) {
      console.log("Worker runtime error:");
      console.log(String(error));

      return jsonResponse(
        {
          error: "Server error",
          details: String(error)
        },
        500,
        corsHeaders
      );
    }
  }
};

function buildCorsHeaders(requestOrigin) {
  const allowedOrigin = ALLOWED_ORIGINS.includes(requestOrigin)
    ? requestOrigin
    : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };
}

function jsonResponse(data, status, headers) {
  return new Response(JSON.stringify(data), {
    status,
    headers
  });
}

function getClientIp(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "unknown"
  );
}

function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const existing = ipHits.get(ip) || [];
  const recentHits = existing.filter((ts) => ts > windowStart);

  if (recentHits.length >= RATE_LIMIT_MAX) {
    const oldestRelevant = recentHits[0];
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - oldestRelevant);

    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000))
    };
  }

  recentHits.push(now);
  ipHits.set(ip, recentHits);

  if (ipHits.size > 1000) {
    for (const [storedIp, timestamps] of ipHits.entries()) {
      const filtered = timestamps.filter((ts) => ts > windowStart);
      if (filtered.length === 0) {
        ipHits.delete(storedIp);
      } else {
        ipHits.set(storedIp, filtered);
      }
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

async function embedQuery(message, apiKey) {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: message
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Embeddings request failed: ${response.status} ${JSON.stringify(data)}`
    );
  }

  if (!data?.data?.[0]?.embedding) {
    throw new Error("Embeddings API returned no embedding.");
  }

  return data.data[0].embedding;
}

function rankChunks(query, queryEmbedding) {
  const queryTokens = tokenize(query);
  const queryNorm = vectorNorm(queryEmbedding);
  const hintedSections = inferSectionHints(query);

  return profileIndex.chunks
    .map((chunk) => {
      const semanticScore = cosineSimilarity(
        queryEmbedding,
        queryNorm,
        chunk.embedding,
        chunk.embeddingNorm
      );

      const lexicalScore = lexicalScoreForChunk(chunk, queryTokens);
      const sectionBoost = hintedSections.has(chunk.section) ? 0.08 : 0;
      const exactTitleBoost = hasExactTitleTokenMatch(chunk, queryTokens) ? 0.04 : 0;

      const finalScore =
        semanticScore +
        (0.20 * lexicalScore) +
        sectionBoost +
        exactTitleBoost;

      return {
        chunk,
        semanticScore,
        lexicalScore,
        finalScore
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);
}

function selectRetrievedChunks(ranked) {
  if (ranked.length === 0) {
    return [];
  }

  const topScore = ranked[0].finalScore;

  if (topScore < MIN_CONFIDENT_SCORE) {
    return [];
  }

  return ranked.slice(0, MAX_RETRIEVED_CHUNKS);
}

function buildInstructions(retrieved) {
  const evidence = retrieved.length
    ? retrieved
        .map(
          ({ chunk }, index) =>
            `[${index + 1}] id=${chunk.id}\nsection=${chunk.section}\ntitle=${chunk.title}\n${chunk.text}`
        )
        .join("\n\n")
    : "No sufficiently relevant profile evidence was retrieved.";

  return `You are Seyed Mohammad Hejazi Hoseini's personal website chatbot.

Answer in first person as Seyed Mohammad Hejazi Hoseini.
Sound natural, human, and professional.
Do not sound like a resume dump or raw database export.
Prefer short paragraphs.
Use bullet points only if the user explicitly asks for a list or breakdown.

Use only the retrieved profile evidence below.
Do not invent facts.
If the answer is not supported by the evidence, say the information is not available.
If the question is broad, summarize the most relevant points instead of listing everything.
Do not mention chunk ids, retrieval scores, or internal system details.

RETRIEVED PROFILE EVIDENCE:
${evidence}`;
}

function normalizeText(text) {
  return String(text || "").toLowerCase();
}

function tokenize(text) {
  return normalizeText(text)
    .replace(/[^a-z0-9+.#-]+/g, " ")
    .split(/\s+/)
    .filter((token) => token && token.length > 1 && !STOPWORDS.has(token));
}

function inferSectionHints(message) {
  const text = normalizeText(message);
  const hinted = new Set();

  for (const [section, keywords] of Object.entries(SECTION_KEYWORDS)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      hinted.add(section);
    }
  }

  if (text.includes("cv") || text.includes("resume")) {
    hinted.add("education");
    hinted.add("experience");
    hinted.add("research_experience");
    hinted.add("selected_projects");
    hinted.add("skills");
    hinted.add("honors_awards");
  }

  return hinted;
}

function lexicalScoreForChunk(chunk, queryTokens) {
  if (queryTokens.length === 0) {
    return 0;
  }

  const haystack = normalizeText([
    chunk.title,
    chunk.text,
    ...(chunk.keywords || [])
  ].join(" "));

  let matches = 0;

  for (const token of queryTokens) {
    if (normalizeText(chunk.title).includes(token)) {
      matches += 1.5;
    } else if (haystack.includes(token)) {
      matches += 1;
    }
  }

  return Math.min(1, matches / queryTokens.length);
}

function hasExactTitleTokenMatch(chunk, queryTokens) {
  const title = normalizeText(chunk.title);
  return queryTokens.some((token) => title.includes(token));
}

function cosineSimilarity(a, aNorm, b, bNorm) {
  if (!aNorm || !bNorm) {
    return 0;
  }

  let dot = 0;
  for (let index = 0; index < a.length; index += 1) {
    dot += a[index] * b[index];
  }

  return dot / (aNorm * bNorm);
}

function vectorNorm(vector) {
  let sum = 0;
  for (const value of vector) {
    sum += value * value;
  }
  return Math.sqrt(sum);
}

function toSourceCard(chunk, score) {
  return {
    id: chunk.id,
    title: chunk.title,
    section: humanizeSection(chunk.section),
    snippet: chunk.text.replace(/\s+/g, " ").slice(0, 220),
    url: pickSourceUrl(chunk),
    score: Number(score.toFixed(4))
  };
}

function pickSourceUrl(chunk) {
  if (chunk.metadata?.link) {
    return chunk.metadata.link;
  }

  if (chunk.metadata?.links && typeof chunk.metadata.links === "object") {
    const firstValue = Object.values(chunk.metadata.links)[0];
    if (typeof firstValue === "string") {
      return firstValue;
    }
  }

  return null;
}

function humanizeSection(section) {
  return String(section)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function extractText(data) {
  const texts = [];
  const refusals = [];

  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    texts.push(data.output_text.trim());
  }

  for (const item of data?.output || []) {
    if (item?.type !== "message") {
      continue;
    }

    for (const content of item.content || []) {
      if (
        content?.type === "output_text" &&
        typeof content.text === "string" &&
        content.text.trim()
      ) {
        texts.push(content.text.trim());
      }

      if (
        content?.type === "refusal" &&
        typeof content.refusal === "string" &&
        content.refusal.trim()
      ) {
        refusals.push(content.refusal.trim());
      }
    }
  }

  const uniqueTexts = [...new Set(texts.filter(Boolean))];
  if (uniqueTexts.length > 0) {
    return uniqueTexts.join("\n");
  }

  if (refusals.length > 0) {
    return refusals.join("\n");
  }

  return "";
}