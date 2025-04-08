document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "1234") {
    showMessage("Giriş Başarılı ✔️ Yönlendiriliyorsunuz...", "success");

    // 2 saniye sonra yönlendirme
    setTimeout(() => {
      window.location.href = "https://www.youtube.com)"; // burayı istediğin sayfayla değiştirebilirsin
    }, 2000);

  } else {
    showMessage("Giriş Başarısız ❌", "error");
  }
});

function showMessage(message, type) {
  const box = document.getElementById("messageBox");
  box.textContent = message;
  box.className = `message ${type}`;
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";
  }, 3000);
}
