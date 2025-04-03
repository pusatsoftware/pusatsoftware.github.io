window.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById("main-content");

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
});
