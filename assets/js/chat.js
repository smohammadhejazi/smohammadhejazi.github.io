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