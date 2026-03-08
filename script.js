const workerUrl = "https://profile-chatbot.smhejazihoseini.workers.dev";

document.getElementById("sendBtn").addEventListener("click", async () => {
  const message = document.getElementById("message").value.trim();
  const responseBox = document.getElementById("responseBox");

  if (!message) {
    responseBox.textContent = "Please type a question.";
    return;
  }

  responseBox.textContent = "Loading...";

  try {
    const res = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    if (!res.ok) {
      responseBox.textContent = "Error: " + JSON.stringify(data, null, 2);
      return;
    }

    responseBox.textContent = data.reply || "No response returned.";
  } catch (err) {
    responseBox.textContent = "Request failed: " + err.message;
  }
});