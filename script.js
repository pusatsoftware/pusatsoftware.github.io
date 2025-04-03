window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById("splash-screen");
  const mainContent = document.getElementById("main-content");

  // Giriş ekranı gösteriliyor
  setTimeout(() => {
    gsap.to(splash, {
      opacity: 0,
      duration: 2,
      onComplete: () => {
        splash.style.display = "none";
        mainContent.style.display = "block";

        // Ana içerik animasyonları
        gsap.registerPlugin(ScrollTrigger);

        gsap.from("header", {
          y: -100,
          opacity: 0,
          duration: 1
        });

        gsap.utils.toArray('.section').forEach(section => {
          gsap.from(section, {
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
          });
        });
      }
    });
  }, 3500); // ⏱️ Süre: 5 saniye (önceden 3.000 idi)
});
