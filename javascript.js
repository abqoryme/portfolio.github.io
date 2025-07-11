const btn = document.getElementById('modeToggle');
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      btn.textContent = document.body.classList.contains('light') ? 'Dark Mode' : 'Light Mode';
    });
    
    // Mini Chart
    const ctx = document.getElementById('miniChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['IND', 'SUN', 'ENG', 'HTML', 'CSS', 'JS', 'JAVA', 'NODE', 'NEXTJS'],
        datasets: [{
          label: 'Project Activity',
          data: [90, 60, 50, 40, 60, 40, 10, 40, 30, 00, 00],
          backgroundColor: ['rgba(30,144,255,0.7)', 'rgba(255,64,129,0.7)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } }
      }
    });
    
    /**
   * Panggil fungsi ini untuk update widget.
   * @param {string} track  - judul lagu
   * @param {string} artist - nama artist
   */
  function updateNowPlaying(track, artist) {
    const el = document.getElementById('nowPlayingText');
    el.textContent = `${track} — ${artist}`;
  }

  // Inisialisasi statis:
  updateNowPlaying('Lo-fi Chill The Moon 🌑', 'Various Artists Erere');

  // Atau kalau mau fetch dari API, panggil updateNowPlaying di callback fetch.
  
   // Kamus terjemahan
  const translations = {
    en: {
      welcome: "#Welcome to my terminal",
      greeting: "Hi, I'm",
      description: "A passionate developer who loves building fun and useful things on the web.",
      projects: "🛠 Projects",
      skills: "📊 Skills Chart",
      bot: "WhatsApp bot for store management via chat commands.",
      asci: "Static website with ASCII style, hosted on GitHub Pages.",
      cyber: "Cyber-themed website with a touch of anime, hosted on Vercel.",
      // ...tambahkan key lain sesuai needs
    },
    id: {
      welcome: "#Selamat datang di shell",
      greeting: "Halo, saya",
      description: "Seorang developer yang senang membuat hal seru dan berguna di web.",
      projects: "🛠 Proyek",
      skills: "📊 Grafik Keahlian",
      bot: "WhatsApp bot untuk manajemen toko via chat commands.",
      asci: "Website statis bergaya ASCII, di-host di GitHub Pages.",
      cyber: "Website cyber dengan sedikit unsur anime, di-host di Vercel.",
      // ...tambahkan key lain sesuai needs
    }
  };

  // State bahasa awal
  let currentLang = 'en';

  // Fungsi apply translation
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = translations[currentLang][key] || el.textContent;
    });
    document.getElementById('langToggle').textContent = currentLang.toUpperCase() === 'EN' ? 'ID' : 'EN';
  }

  // Event listener tombol
  document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'id' : 'en';
    applyTranslations();
  });

  // Inisialisasi pertama translate
  applyTranslations();
  
  // Utility untuk format 2-digit
  function pad(v) { return v.toString().padStart(2, '0'); }

  // Update jam setiap detik
  function startClock() {
    const tEl = document.getElementById('timeText');
    setInterval(() => {
      const d = new Date();
      tEl.textContent = 
        pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }, 1000);
  }

  // Fetch lokasi via ipapi.co (gratis, no API key)
  function fetchLocation() {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const loc = `${data.city}, ${data.region}, ${data.country_name}`;
        document.getElementById('locationText').textContent = loc;
      })
      .catch(() => {
        document.getElementById('locationText').textContent = 'Location unavailable';
      });
  }

  // Inisialisasi
  startClock();
  fetchLocation();
  
  //Fake shell amazing 🖥️
  const term = document.getElementById('fakeTerminal');

  // Command function handler
  const commands = {
    whoami: () => 'abqaris',
    pwd: () => '/home/abqaris',
    ls: () => 'projects  blog.html  index.html',
    'siapa abqaris': () => {
return `Hai, Aku Asisten AI, dan ini sedikit cerita tentang pemilikku, Abqaris (kadang juga dipanggil Abqory).
Abqaris adalah pemuda yang baik hati dan selalu antusias belajar hal baru. Ia punya pesona sendiri—tampan tapi pendiam—sehingga kesan pertama mungkin tampak tenang. Sampai sekarang, ia belum menemukan sosok yang tepat untuk diajak berbagi kisah hati. Kalau kamu tertarik mendekatinya, saran dariku: bersabarlah dan tunjukkan kelembutanmu. Dia menghargai suasana yang santai dan tidak suka terburu-buru...🤖`;
},
    help: () => 'Commands: whoami, pwd, ls, echo, help, clear, social, :q',
    clear: () => {
      // Hapus semua elemen kecuali baris input terakhir
      [...term.querySelectorAll('.line, .output')].forEach(el => el.remove());
      return null; // tidak tampilkan output
    },
    social: () => {
      return `GitHub: https://github.com/abqoryme\n
Instagram: https://bit.ly/abqoryme4\n
X: https://x.com/humanxxx00000`;
    },
    ':q': () => {
      return '👋 You have exited the terminal. (But not really...)';
    }
  };

  function createInputLine() {
    const line = document.createElement('div');
    line.classList.add('line');
    line.innerHTML = `
      <span class="prompt">abqaris@terminal:$</span>
      <input type="text" class="input" autocomplete="off" autofocus placeholder="Type a command..." />
    `;
    term.appendChild(line);
    const inputEl = line.querySelector('.input');
    inputEl.focus();

    inputEl.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const cmd = inputEl.value.trim();
      if (!cmd) return;

      // Ganti input dengan teks statis
      const staticText = document.createElement('span');
      staticText.textContent = cmd;
      staticText.classList.add('input');
      line.replaceChild(staticText, inputEl);

      // Proses command
      let output = '';
      if (cmd.startsWith('echo ')) {
        output = cmd.slice(5).replace(/^["']|["']$/g, '');
      } else if (commands[cmd]) {
        const result = commands[cmd]();
        if (result !== null) output = result;
      } else {
        output = `${cmd}: command not found`;
      }

      // Tampilkan output kalau ada
      if (output) {
        const outEl = document.createElement('div');
        outEl.classList.add('output');
        outEl.textContent = output;
        term.appendChild(outEl);
      }

      // Scroll dan buat input baru
      term.scrollTop = term.scrollHeight;
      createInputLine();
    });
  }

  // Start terminal
  createInputLine();