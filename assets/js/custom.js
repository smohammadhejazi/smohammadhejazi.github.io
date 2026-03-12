document.addEventListener("DOMContentLoaded", () => {
    const cvLinks = document.querySelectorAll('a[href$="/cv.pdf"], a[href="\/cv.pdf"]');
  
    cvLinks.forEach((link) => {
      link.setAttribute("download", "Mohammad_Hejazi_CV.pdf");
    });
  });