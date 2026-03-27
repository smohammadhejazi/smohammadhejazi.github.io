const workerUrl = "https://profile-chatbot.smhejazihoseini.workers.dev";

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");

let loadingMessageEl = null;

function createBubble(role, text) {
  const bubble = document.createElement("div");
  bubble.className = `message-bubble ${role === "user" ? "user-bubble" : "assistant-bubble"}`;
  bubble.textContent = text;
  return bubble;
}

function addMessage(role, text) {
  const row = document.createElement("div");
  row.className = `message-row ${role}`;
  row.appendChild(createBubble(role, text));
  chatMessages.appendChild(row);
  scrollToBottom();
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

async function parseJsonSafely(response) {
  const raw = await response.text();

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return { raw };
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

  const data = await parseJsonSafely(res);

  if (!res.ok) {
    const errorParts = [];

    if (typeof data?.error === "string") {
      errorParts.push(data.error);
    } else if (data?.error) {
      errorParts.push(JSON.stringify(data.error));
    } else {
      errorParts.push(`HTTP ${res.status}`);
    }

    if (typeof data?.details === "string" && data.details.trim()) {
      errorParts.push(data.details);
    }

    if (data?.incomplete_details) {
      errorParts.push(JSON.stringify(data.incomplete_details));
    }

    throw new Error(errorParts.join(" | "));
  }

  return {
    reply: data?.reply || "No response returned."
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
      addMessage("assistant", data.reply);
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