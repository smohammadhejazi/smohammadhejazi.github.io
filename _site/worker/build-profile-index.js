import fs from "node:fs/promises";
import { profileData } from "./profile-data.js";

const EMBEDDING_MODEL = "text-embedding-3-small";
const OUTPUT_FILE = new URL("./profile-index.js", import.meta.url);
const EMBEDDING_BATCH_SIZE = 50;

const STOPWORDS = new Set([
  "a","an","and","are","as","at","be","by","do","for","from","how",
  "i","in","is","it","me","my","of","on","or","so","tell","that",
  "the","to","what","when","where","which","who","why","with","you",
  "your","about","please","can","could","would","using","used","work",
  "works","working","include","includes","including"
]);

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set.");

  const chunks = buildChunks(profileData);

  const embeddings = await createEmbeddings(
    chunks.map((c) => c.text),
    apiKey,
    EMBEDDING_MODEL
  );

  const indexedChunks = chunks.map((chunk, i) => ({
    ...chunk,
    embedding: embeddings[i],
    embeddingNorm: vectorNorm(embeddings[i])
  }));

  const profileIndex = {
    version: 2,
    generatedAt: new Date().toISOString(),
    embeddingModel: EMBEDDING_MODEL,
    chunkCount: indexedChunks.length,
    chunks: indexedChunks
  };

  const fileContents =
    `export const profileIndex = ${JSON.stringify(profileIndex, null, 2)};\n`;

  await fs.writeFile(OUTPUT_FILE, fileContents, "utf8");

  console.log(`✅ Wrote ${indexedChunks.length} chunks to profile-index.js`);
}

/* ----------------------- CHUNKING ----------------------- */

function buildChunks(data) {
  const chunks = [];

  chunks.push(createChunk({
    id: "bio",
    section: "bio",
    title: data.bio.name,
    lines: [
      data.bio.short_intro,
      data.bio.summary,
      data.bio.preferred_name ? `Preferred name: ${data.bio.preferred_name}` : "",
      data.bio.birthplace ? `Born in: ${data.bio.birthplace}` : "",
      `Location: ${data.bio.location}`
    ]
  }));

  chunks.push(createChunk({
    id: "contact",
    section: "contact",
    title: "Contact",
    lines: [
      `Email: ${data.contact.email}`,
      `Phone: ${data.contact.phone}`
    ]
  }));

  chunks.push(createChunk({
    id: "links",
    section: "links",
    title: "Online Links",
    lines: Object.entries(data.links)
      .map(([k, v]) => `${humanize(k)}: ${v}`)
  }));

  chunks.push(createChunk({
    id: "research_interests",
    section: "research_interests",
    title: "Research Interests",
    lines: data.research_interests
  }));

  data.experience.forEach((item, i) => {
    chunks.push(createChunk({
      id: `experience_${i}`,
      section: "experience",
      title: item.title,
      lines: [`Dates: ${item.dates}`, item.summary]
    }));
  });

  data.education.forEach((item, i) => {
    chunks.push(createChunk({
      id: `education_${i}`,
      section: "education",
      title: `${item.degree} at ${item.institution}`,
      lines: [
        `${item.field}`,
        `${item.institution}, ${item.location}`,
        `Dates: ${item.dates}`,
        item.gpa ? `GPA: ${item.gpa}` : ""
      ]
    }));
  });

  data.research_experience.forEach((item, i) => {
    chunks.push(createChunk({
      id: `research_experience_${i}`,
      section: "research_experience",
      title: item.title,
      lines: [`Dates: ${item.dates}`, item.summary]
    }));
  });

  data.selected_projects.forEach((item, i) => {
    chunks.push(createChunk({
      id: `project_${i}`,
      section: "projects",
      title: item.name,
      lines: [item.summary]
    }));
  });

  Object.entries(data.skills).forEach(([category, list]) => {
    chunks.push(createChunk({
      id: `skills_${category}`,
      section: "skills",
      title: `Skills: ${humanize(category)}`,
      lines: list
    }));
  });

  data.languages.forEach((item, i) => {
    chunks.push(createChunk({
      id: `language_${i}`,
      section: "languages",
      title: item.language,
      lines: [`Proficiency: ${item.proficiency}`, item.details || ""]
    }));
  });

  data.honors_awards.forEach((item, i) => {
    chunks.push(createChunk({
      id: `award_${i}`,
      section: "awards",
      title: item.title,
      lines: [`Issuer: ${item.issuer}`, `Year: ${item.year}`]
    }));
  });

  data.related_courses.forEach((course, i) => {
    chunks.push(createChunk({
      id: `course_${i}`,
      section: "courses",
      title: course,
      lines: []
    }));
  });

  /* ---------- NEW: EXTRA INFORMATION ---------- */

  if (data.extra_information?.about_page_intro) {
    chunks.push(createChunk({
      id: "about_intro",
      section: "extra_information",
      title: "About Me",
      lines: data.extra_information.about_page_intro
    }));
  }

  if (data.extra_information?.random_facts) {
    data.extra_information.random_facts.forEach((fact, i) => {
      chunks.push(createChunk({
        id: `fact_${i}`,
        section: "extra_information",
        title: "Personal Fact",
        lines: [fact]
      }));
    });
  }

  return chunks;
}

/* ----------------------- HELPERS ----------------------- */

function createChunk({ id, section, title, lines }) {
  const clean = lines
    .map((l) => String(l || "").trim())
    .filter(Boolean);

  const text = [
    `Section: ${humanize(section)}`,
    `Title: ${title}`,
    ...clean
  ].join("\n");

  return {
    id,
    section,
    title,
    text,
    keywords: extractKeywords(text)
  };
}

function humanize(s) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t))
    .slice(0, 20);
}

function vectorNorm(v) {
  return Math.sqrt(v.reduce((s, x) => s + x * x, 0));
}

async function createEmbeddings(inputs, apiKey, model) {
  const all = [];

  for (let i = 0; i < inputs.length; i += EMBEDDING_BATCH_SIZE) {
    const batch = inputs.slice(i, i + EMBEDDING_BATCH_SIZE);

    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: batch
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(JSON.stringify(data));

    all.push(...data.data.map((d) => d.embedding));

    console.log(`Embedded ${i + batch.length}/${inputs.length}`);
  }

  return all;
}