window.addEventListener('load', () => {
  gsap.from('.main-section', { duration: 1.2, y: 50, opacity: 0, ease: "power3.out" });
  gsap.from('.header', { duration: 1, y: -50, opacity: 0, ease: "power2.out" });
});

const loginForm = document.getElementById('loginForm');
const output = document.getElementById('terminalOutput');
const heading = document.querySelector('.neon');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (username === 'neo' && password === 'matrix') {
    loginForm.style.display = 'none';
    heading.style.display = 'none';
    output.classList.remove('hidden');

    output.innerHTML = `<p class="subtitle">Bağlantı güvenli. Kimlik doğrulanıyor...</p>`;

    setTimeout(() => {
      output.innerHTML = `
        <h2 class="typewriter neon">Erişim Yetkisi Verildi: root@pusat</h2>
        <p class="subtitle">Shell ortamı başlatılıyor...</p>
      `;
    }, 2500);

    // 2 saniye sonra yönlendirme (toplamda 4.5 saniye)
    setTimeout(() => {
      window.location.href = "https://pusatsoftware.github.io/line";
    }, 4500);

  } else {
    alert("Yetkisiz giriş. Sistemden çıkış yapılıyor.");
    window.location.href = "https://google.com/404";
  }
});
