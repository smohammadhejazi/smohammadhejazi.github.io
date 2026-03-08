const workerUrl = "https://profile-chatbot.smhejazihoseini.workers.dev";

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");

let loadingMessageEl = null;

function addMessage(role, text) {
  const row = document.createElement("div");
  row.className = `message-row ${role}`;

  const bubble = document.createElement("div");
  bubble.className = `message-bubble ${role === "user" ? "user-bubble" : "assistant-bubble"}`;
  bubble.textContent = text;

  row.appendChild(bubble);
  chatMessages.appendChild(row);
  scrollToBottom();

  return row;
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
  messageInput.style.height = "auto";
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 180)}px`;
}

messageInput.addEventListener("input", autoResizeTextarea);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

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
    const res = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    removeLoadingMessage();

    if (!res.ok) {
      addMessage("assistant", `Error: ${JSON.stringify(data, null, 2)}`);
    } else {
      addMessage("assistant", data.reply || "No response returned.");
    }
  } catch (err) {
    removeLoadingMessage();
    addMessage("assistant", `Request failed: ${err.message}`);
  } finally {
    sendBtn.disabled = false;
    messageInput.disabled = false;
    messageInput.focus();
  }
});

function initializeChat() {
  addMessage(
    "assistant",
    "Hi — ask me anything about my background, education, research, projects, and experience."
  );
  autoResizeTextarea();
  scrollToBottom();
}

initializeChat();