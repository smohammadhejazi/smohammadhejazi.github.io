document.addEventListener("DOMContentLoaded", () => {
    const cvLinks = document.querySelectorAll('a[href$="/cv.pdf"], a[href="\/cv.pdf"]');
  
    cvLinks.forEach((link) => {
      link.setAttribute("download", "Mohammad_Hejazi_CV.pdf");
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const emailButton = document.querySelector(".email-copy-button");
    const toast = document.getElementById("email-copy-toast");
  
    if (!emailButton || !toast) return;
  
    let toastTimer = null;
  
    function showToast(message) {
      toast.textContent = message;
      toast.classList.add("is-visible");
  
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove("is-visible");
      }, 1800);
    }
  
    async function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
  
      const tempInput = document.createElement("textarea");
      tempInput.value = text;
      tempInput.setAttribute("readonly", "");
      tempInput.style.position = "absolute";
      tempInput.style.left = "-9999px";
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }
  
    emailButton.addEventListener("click", async () => {
      const email = emailButton.dataset.email;
  
      try {
        await copyText(email);
        showToast("Email copied");
      } catch (error) {
        showToast("Could not copy");
      }
    });
  });