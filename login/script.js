// script.js
const form = document.getElementById('login-form');
const message = document.getElementById('message');
const loginBox = document.querySelector('.login-box');
const contactMessage = document.getElementById("contact-message");
const redirectUrl = "https://pusatsoftware.github.io/tools/";

console.log("contactMessage elementi:", contactMessage); // Kontrol

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    if (username === 'admin' && password === '159753') {
        message.textContent = "Giriş Başarılı! Yönlendiriliyorsunuz...";
        message.className = "message success show";
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 1500);
    } else {
        message.textContent = "Giriş Başarısız!";
        message.className = "message error show";

        if (contactMessage) { // contactMessage null değilse çalışır
            contactMessage.classList.add("show");
            console.log("contactMessage.classList.add('show') çalıştı");
            loginBox.classList.add('error-shake');

            setTimeout(() => {
                loginBox.classList.remove('error-shake');
                message.className = "message";
                contactMessage.classList.remove("show");
                console.log("contactMessage.classList.remove('show') çalıştı");
            }, 3000);
        } else {
            console.error("contactMessage elementi bulunamadı!");
        }
    }
});
