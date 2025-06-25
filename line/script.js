const terminal = document.getElementById('terminal');

terminal.addEventListener('click', () => {
  const input = terminal.querySelector('.input:last-child');
  if (input) input.focus();
});

terminal.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    const currentInput = e.target;
    const command = currentInput.innerText.trim().toLowerCase();

    // quit, q, exit komutları
    if (command === "quit" || command === "q" || command === "exit") {
      const exitMessage = document.createElement('div');
      exitMessage.classList.add('line');
      exitMessage.style.color = 'yellow';
      exitMessage.textContent = 'Sistemden çıkış yapılıyor...';
      terminal.appendChild(exitMessage);
      currentInput.contentEditable = "false";

      setTimeout(() => {
        window.location.href = "https://pusatsoftware.github.io/terminal/";
      }, 2000);
      return;
    }

    // connect komutları
    if (command === "connect tools") {
      const msg = document.createElement('div');
      msg.classList.add('line');
      msg.style.color = 'lightgreen';
      msg.textContent = 'Bağlantı başarılı! Yönlendiriliyorsunuz...';
      terminal.appendChild(msg);
      currentInput.contentEditable = "false";

      setTimeout(() => {
        window.location.href = "https://pusatsoftware.github.io/tools";
      }, 2000);
      return;
    }

    if (command === "connect home") {
      const msg = document.createElement('div');
      msg.classList.add('line');
      msg.style.color = 'lightgreen';
      msg.textContent = 'Bağlantı başarılı! Yönlendiriliyorsunuz...';
      terminal.appendChild(msg);
      currentInput.contentEditable = "false";

      setTimeout(() => {
        window.location.href = "https://pusatsoftware.github.io/";
      }, 2000);
      return;
    }

    if (command === "connect terminal") {
      const msg = document.createElement('div');
      msg.classList.add('line');
      msg.style.color = 'lightgreen';
      msg.textContent = 'Bağlantı başarılı! Yönlendiriliyorsunuz...';
      terminal.appendChild(msg);
      currentInput.contentEditable = "false";

      setTimeout(() => {
        window.location.href = "https://pusatsoftware.github.io/terminal";
      }, 2000);
      return;
    }

    // Diğer komutlar: sadece yeni satır oluştur
    const newLine = document.createElement('div');
    newLine.classList.add('line');
    newLine.innerHTML = `
      <div class="prompt-prefix">
        <span class="root-root">root@root</span><span class="colon">:</span><span class="tilde">~</span><span class="dollar">$</span>
      </div>
      <span class="input" contenteditable="true" spellcheck="false"></span>
    `;
    terminal.appendChild(newLine);

    const newInput = newLine.querySelector('.input');
    newInput.focus();

    terminal.scrollTop = terminal.scrollHeight;
  }
});
