import fs from "node:fs/promises";
import { profileData } from "./profile-data.js";

const EMBEDDING_MODEL = "text-embedding-3-small";
const OUTPUT_FILE = new URL("./profile-index.js", import.meta.url);
const EMBEDDING_BATCH_SIZE = 50;

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "do", "for", "from", "how",
  "i", "in", "is", "it", "me", "my", "of", "on", "or", "so", "tell", "that",
  "the", "to", "what", "when", "where", "which", "who", "why", "with", "you",
  "your", "about", "please", "can", "could", "would", "using", "used", "work",
  "works", "working", "include", "includes", "including"
]);

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set.");
  }

  const chunks = buildChunks(profileData);
  const embeddings = await createEmbeddings(
    chunks.map((chunk) => chunk.text),
    apiKey,
    EMBEDDING_MODEL
  );

  const indexedChunks = chunks.map((chunk, index) => {
    const embedding = embeddings[index];
    return {
      ...chunk,
      embedding,
      embeddingNorm: vectorNorm(embedding)
    };
  });

  const profileIndex = {
    version: 1,
    generatedAt: new Date().toISOString(),
    embeddingModel: EMBEDDING_MODEL,
    chunkCount: indexedChunks.length,
    chunks: indexedChunks
  };

  const fileContents =
    `export const profileIndex = ${JSON.stringify(profileIndex, null, 2)};\n`;

  await fs.writeFile(OUTPUT_FILE, fileContents, "utf8");

  console.log(`Wrote ${indexedChunks.length} chunks to profile-index.js`);
}

function buildChunks(data) {
  const chunks = [];

  chunks.push(
    createChunk({
      id: "bio",
      section: "bio",
      title: data.bio.name,
      lines: [
        data.bio.short_intro,
        data.bio.summary,
        `Location: ${data.bio.location}`
      ],
      metadata: {
        location: data.bio.location
      }
    })
  );

  chunks.push(
    createChunk({
      id: "contact",
      section: "contact",
      title: "Contact",
      lines: [
        `Email: ${data.contact.email}`,
        `Phone: ${data.contact.phone}`
      ],
      metadata: {
        email: data.contact.email,
        phone: data.contact.phone
      }
    })
  );

  chunks.push(
    createChunk({
      id: "links",
      section: "links",
      title: "Online Links",
      lines: Object.entries(data.links).map(([key, value]) => `${humanizeKey(key)}: ${value}`),
      metadata: { ...data.links }
    })
  );

  chunks.push(
    createChunk({
      id: "research_interests",
      section: "research_interests",
      title: "Research Interests",
      lines: data.research_interests.map((item) => item),
      metadata: {
        count: data.research_interests.length
      }
    })
  );

  data.experience.forEach((item, index) => {
    chunks.push(
      createChunk({
        id: `experience_${index}`,
        section: "experience",
        title: item.title,
        lines: [
          `Dates: ${item.dates}`,
          item.summary
        ],
        metadata: {
          dates: item.dates
        }
      })
    );
  });

  data.education.forEach((item, index) => {
    const details = [
      `${item.degree}, ${item.field}`,
      `${item.institution}, ${item.location}`,
      `Dates: ${item.dates}`
    ];

    if (item.gpa) {
      details.push(`GPA: ${item.gpa}`);
    }

    chunks.push(
      createChunk({
        id: `education_${index}`,
        section: "education",
        title: `${item.degree} at ${item.institution}`,
        lines: details,
        metadata: {
          institution: item.institution,
          location: item.location,
          degree: item.degree,
          field: item.field,
          dates: item.dates,
          gpa: item.gpa || null
        }
      })
    );
  });

  data.teaching_assistant_experience.forEach((item, index) => {
    chunks.push(
      createChunk({
        id: `teaching_assistant_experience_${index}`,
        section: "teaching_assistant_experience",
        title: `${item.course} (${item.term})`,
        lines: [
          `Instructor: ${item.instructor}`,
          `Responsibilities: ${item.responsibilities.join(", ")}`
        ],
        metadata: {
          course: item.course,
          term: item.term,
          instructor: item.instructor
        }
      })
    );
  });

  data.research_experience.forEach((item, index) => {
    const lines = [
      `Dates: ${item.dates}`,
      item.summary
    ];

    if (item.links) {
      for (const [key, value] of Object.entries(item.links)) {
        lines.push(`${humanizeKey(key)}: ${value}`);
      }
    }

    chunks.push(
      createChunk({
        id: `research_experience_${index}`,
        section: "research_experience",
        title: item.title,
        lines,
        metadata: {
          dates: item.dates,
          links: item.links || null
        }
      })
    );
  });

  data.selected_projects.forEach((item, index) => {
    chunks.push(
      createChunk({
        id: `selected_projects_${index}`,
        section: "selected_projects",
        title: item.name,
        lines: [
          item.summary,
          item.link ? `Link: ${item.link}` : ""
        ],
        metadata: {
          link: item.link || null
        }
      })
    );
  });

  Object.entries(data.skills).forEach(([category, values]) => {
    chunks.push(
      createChunk({
        id: `skills_${category}`,
        section: "skills",
        title: `Skills: ${humanizeKey(category)}`,
        lines: values,
        metadata: {
          category,
          values
        }
      })
    );
  });

  data.languages.forEach((item, index) => {
    chunks.push(
      createChunk({
        id: `languages_${index}`,
        section: "languages",
        title: item.language,
        lines: [
          `Proficiency: ${item.proficiency}`,
          item.details ? item.details : ""
        ],
        metadata: {
          language: item.language,
          proficiency: item.proficiency
        }
      })
    );
  });

  data.honors_awards.forEach((item, index) => {
    chunks.push(
      createChunk({
        id: `honors_awards_${index}`,
        section: "honors_awards",
        title: item.title,
        lines: [
          `Issuer: ${item.issuer}`,
          `Year: ${item.year}`,
          item.details ? item.details : ""
        ],
        metadata: {
          issuer: item.issuer,
          year: item.year
        }
      })
    );
  });

  data.related_courses.forEach((course, index) => {
    chunks.push(
      createChunk({
        id: `related_courses_${index}`,
        section: "related_courses",
        title: course,
        lines: [
          "Relevant course"
        ],
        metadata: {
          course
        }
      })
    );
  });

  return chunks;
}

function createChunk({ id, section, title, lines, metadata = {} }) {
  const cleanedLines = lines
    .map((line) => String(line || "").trim())
    .filter(Boolean);

  const text = [
    `Section: ${humanizeKey(section)}`,
    `Title: ${title}`,
    ...cleanedLines
  ].join("\n");

  const keywordSeed = `${title} ${text} ${flattenValue(metadata)}`;

  return {
    id,
    section,
    title,
    text,
    metadata,
    keywords: extractKeywords(keywordSeed)
  };
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

function extractKeywords(text, limit = 24) {
  const seen = new Set();
  const keywords = [];

  for (const token of tokenize(text)) {
    if (!seen.has(token)) {
      seen.add(token);
      keywords.push(token);
    }

    if (keywords.length >= limit) {
      break;
    }
  }

  return keywords;
}

function humanizeKey(value) {
  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function flattenValue(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(flattenValue).join(" ");
  if (typeof value === "object") return Object.values(value).map(flattenValue).join(" ");
  return String(value);
}

function vectorNorm(vector) {
  let sum = 0;
  for (const value of vector) {
    sum += value * value;
  }
  return Math.sqrt(sum);
}

async function createEmbeddings(inputs, apiKey, model) {
  const allEmbeddings = [];

  for (let start = 0; start < inputs.length; start += EMBEDDING_BATCH_SIZE) {
    const batch = inputs.slice(start, start + EMBEDDING_BATCH_SIZE);

    const response = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: batch
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Embeddings request failed: ${response.status} ${JSON.stringify(data)}`
      );
    }

    const sorted = [...data.data].sort((a, b) => a.index - b.index);
    allEmbeddings.push(...sorted.map((item) => item.embedding));

    console.log(`Embedded ${Math.min(start + batch.length, inputs.length)} / ${inputs.length}`);
  }

  return allEmbeddings;
}