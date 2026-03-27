const workerUrl = "https://profile-chatbot.smhejazihoseini.workers.dev";

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");

let loadingMessageEl = null;

function addMessage(role, text, sources = []) {
  const row = document.createElement("div");
  row.className = `message-row ${role}`;

  const bubble = document.createElement("div");
  bubble.className = `message-bubble ${role === "user" ? "user-bubble" : "assistant-bubble"}`;
  bubble.textContent = text;

  row.appendChild(bubble);

  if (role === "assistant" && Array.isArray(sources) && sources.length > 0) {
    row.appendChild(createSourcesContainer(sources));
  }

  chatMessages.appendChild(row);
  scrollToBottom();
}

function createSourcesContainer(sources) {
  const container = document.createElement("div");
  container.className = "chat-sources";

  const heading = document.createElement("div");
  heading.className = "chat-sources-heading";
  heading.textContent = "Related profile sources";
  container.appendChild(heading);

  for (const source of sources) {
    container.appendChild(createSourceCard(source));
  }

  return container;
}

function createSourceCard(source) {
  const hasUrl = typeof source?.url === "string" && source.url.trim() !== "";
  const card = document.createElement(hasUrl ? "a" : "div");
  card.className = "chat-source-card";

  if (hasUrl) {
    card.href = source.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
  }

  const title = document.createElement("div");
  title.className = "chat-source-title";
  title.textContent = source?.title || "Untitled source";
  card.appendChild(title);

  const metaParts = [];

  if (source?.section) {
    metaParts.push(source.section);
  }

  if (source?.id) {
    metaParts.push(source.id);
  }

  if (metaParts.length > 0) {
    const meta = document.createElement("div");
    meta.className = "chat-source-meta";
    meta.textContent = metaParts.join(" • ");
    card.appendChild(meta);
  }

  if (source?.snippet) {
    const snippet = document.createElement("div");
    snippet.className = "chat-source-snippet";
    snippet.textContent = source.snippet;
    card.appendChild(snippet);
  }

  return card;
}

function addLoadingMessage() {
  loadingMessageEl = document.createElement("div");
  loadingMessageEl.className = "message-row assistant";

  const bubble = document.createElement("div");
  bubble.className = "message-bubble assistant-bubble typing";
  bubble.textContent = "Thinking...";

  loadingMessageEl.appendChild(bubble);
  chatMessages.appendChild(loadingMessageEl);
  scrollToBottom();
}

function removeLoadingMessage() {
  if (loadingMessageEl) {
    loadingMessageEl.remove();
    loadingMessageEl = null;
  }
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function autoResizeTextarea() {
  if (!messageInput) return;

  const maxHeight = 180;

  messageInput.style.height = "0px";

  const neededHeight = messageInput.scrollHeight;

  if (neededHeight <= maxHeight) {
    messageInput.style.height = `${neededHeight}px`;
    messageInput.style.overflowY = "hidden";
  } else {
    messageInput.style.height = `${maxHeight}px`;
    messageInput.style.overflowY = "auto";
  }
}

async function sendChatMessage(message) {
  const res = await fetch(workerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  if (!res.ok) {
    const errorText =
      typeof data?.error === "string"
        ? data.error
        : `Error: ${JSON.stringify(data, null, 2)}`;

    throw new Error(errorText);
  }

  return {
    reply: data?.reply || "No response returned.",
    sources: Array.isArray(data?.sources) ? data.sources : []
  };
}

if (chatForm) {
  chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = messageInput.value.trim();
    if (!message) return;

    addMessage("user", message);
    messageInput.value = "";
    autoResizeTextarea();

    sendBtn.disabled = true;
    messageInput.disabled = true;
    addLoadingMessage();

    try {
      const data = await sendChatMessage(message);
      removeLoadingMessage();
      addMessage("assistant", data.reply, data.sources);
    } catch (err) {
      removeLoadingMessage();
      addMessage("assistant", `Request failed: ${err.message}`);
    } finally {
      sendBtn.disabled = false;
      messageInput.disabled = false;
      messageInput.focus();
    }
  });
}

function initializeChat() {
  if (!chatMessages) return;

  addMessage(
    "assistant",
    "Hi, ask me anything about my background, education, research, projects, and experience."
  );

  if (messageInput) {
    autoResizeTextarea();
  }

  scrollToBottom();
}

initializeChat();