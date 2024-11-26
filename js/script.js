// Ambil elemen <header> dari dokumen
const header = document.querySelector("header");

// Tambahkan event listener pada window untuk mendeteksi scroll
window.addEventListener("scroll", function () {
  // Toggle kelas "sticky" pada header berdasarkan posisi scroll
  // Jika posisi scroll lebih dari 120px, tambahkan kelas "sticky"
  header.classList.toggle("sticky", window.scrollY > 120);
});

// Ambil elemen dengan ID "menu-icon" dan elemen dengan kelas "navlist"
let menu = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

// Tambahkan event listener untuk menangani klik pada ikon menu
menu.onclick = () => {
  // Toggle kelas "bx-x" pada ikon menu untuk mengubah tampilannya
  menu.classList.toggle("bx-x");
  // Toggle kelas "active" pada navlist untuk menampilkan/menyembunyikan daftar navigasi
  navlist.classList.toggle("active");
};

// Tambahkan event listener pada window untuk mendeteksi scroll
window.onscroll = () => {
  // Saat scroll terjadi, hapus kelas "bx-x" dari ikon menu dan "active" dari navlist
  // Ini memastikan menu kembali ke keadaan semula saat halaman di-scroll
  menu.classList.remove("bx-x");
  navlist.classList.remove("active");
};

// Ambil elemen yang akan digunakan untuk toggle konten skill berdasarkan tombol yang diklik
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

// Fungsi untuk memperbarui konten skillsBox berdasarkan tombol yang diklik
function updateSkillsContent(activeIndex) {
  // Hapus kelas "active" dari semua tombol untuk mengatur ulang statusnya
  toggleBtns.forEach((btn) => btn.classList.remove("active"));

  // Tambahkan kelas "active" ke tombol yang sesuai dengan indeks yang diklik
  toggleBtns[activeIndex].classList.add("active");

  // Perbarui konten dalam skillsBox berdasarkan tombol yang diklik
  if (activeIndex === 0) {
    // Jika tombol pertama (Skills) diklik, tampilkan daftar skills
    skillsBox.innerHTML = `
      <ul class="skills-list">
        <li><div class="skill-card"><div class="card-icon"><img src="icon/java-script.png" alt="logo skill 1" /></div></div></li>
        <li><div class="skill-card"><div class="card-icon"><img src="icon/java.png" alt="logo skill 3" /></div></div></li>
        <li><div class="skill-card"><div class="card-icon"><img src="icon/python.png" alt="logo skill 2" /></div></div></li>
        <li><div class="skill-card"><div class="card-icon"><img src="icon/react.png" alt="logo skill 4" /></div></div></li>
        <li><div class="skill-card"><div class="card-icon"><img src="icon/cplus.png" alt="logo skill 4" /></div></div></li>
        <li><div class="skill-card"><div class="card-icon"><img src="icon/php.png" alt="logo skill 4" /></div></div></li>
        <li><div class="skill-card"><div class="card-icon"><img src="icon/html.png" alt="logo skill 4" /></div></div></li>
        <li><div class="skill-card"><div class="card-icon"><img src="icon/css.png" alt="logo skill 4" /></div></div></li>
      </ul>
    `;
  } else if (activeIndex === 1) {
    // Jika tombol kedua (Tools) diklik, tampilkan daftar tools
    skillsBox.innerHTML = `
      <ul class="skills-list">
        <li><div class="skill-card"><div class="card-icon"><img src="icon/visual-studio.png" alt="logo tool 1" /></div></div></li>
        <li><div class="skill-card"><div class="card-icon"><img src="icon/figma.png" alt="logo tool 2" /></div></div></li>
        <li><div class="skill-card"><div class="card-icon"><img src="icon/photoshop.png" alt="logo tool 3" /></div></div></li>
        <li><div class="skill-card"><div class="card-icon"><img src="icon/illustrator.png" alt="logo tool 4" /></div></div></li>
      </ul>
    `;
  }
}

// Tambahkan event listener pada setiap tombol untuk mendeteksi klik dan memperbarui konten
toggleBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Perbarui konten skillsBox sesuai tombol yang diklik
    updateSkillsContent(index);
  });
});

// Jalankan fungsi untuk menampilkan konten awal (Skills)
updateSkillsContent(0);

// tema
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Cek dan terapkan tema yang tersimpan di localStorage
  const savedTheme = localStorage.getItem("theme") || "dark";
  body.classList.add(`${savedTheme}-theme`);

  // Ubah status checkbox sesuai tema yang tersimpan
  themeToggle.checked = savedTheme === "light";

  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
  });
});

// Mengambil elemen pagination dan kotak sertifikat
const paginationButtons = document.querySelectorAll(".pagination button");
const certificateBoxes = document.querySelectorAll(".sertifikat-content .box");

// Menentukan jumlah item per halaman dan total halaman
const itemsPerPage = 4; // Contoh: Menampilkan 2 sertifikat per halaman
let currentPage = 1;
const totalPages = Math.ceil(certificateBoxes.length / itemsPerPage);

// Fungsi untuk menampilkan sertifikat berdasarkan halaman
function showCertificates(page) {
  // Hitung indeks awal dan akhir untuk item yang akan ditampilkan
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Sembunyikan semua kotak sertifikat terlebih dahulu
  certificateBoxes.forEach((box, index) => {
    box.style.display =
      index >= startIndex && index < endIndex ? "block" : "none";
  });
}

// Fungsi untuk memperbarui tombol pagination
function updatePaginationButtons() {
  paginationButtons.forEach((button) => button.classList.remove("active"));
  paginationButtons[currentPage - 1].classList.add("active");
}

// Event listener untuk tombol pagination
paginationButtons.forEach((button, index) => {
  button.addEventListener("click", function () {
    if (this.textContent === "Next") {
      // Logika untuk tombol 'Next'
      if (currentPage < totalPages) {
        currentPage++;
      }
    } else {
      // Logika untuk tombol angka
      currentPage = parseInt(this.textContent);
    }

    // Tampilkan sertifikat dan perbarui tombol pagination
    showCertificates(currentPage);
    updatePaginationButtons();
  });
});

// Menampilkan halaman pertama dan memperbarui tombol pagination saat pertama kali dimuat
showCertificates(currentPage);
updatePaginationButtons();


// JavaScript untuk menampilkan dan menyembunyikan project IT dan Design
document.getElementById("btn-it").addEventListener("click", function() {
  const itProjects = document.querySelectorAll(".project-it");
  const designProjects = document.querySelectorAll(".project-design");

  // Tampilkan semua project IT
  itProjects.forEach(project => project.style.display = "block");

  // Sembunyikan semua project Design
  designProjects.forEach(project => project.style.display = "none");
});

document.getElementById("btn-design").addEventListener("click", function() {
  const itProjects = document.querySelectorAll(".project-it");
  const designProjects = document.querySelectorAll(".project-design");

  // Sembunyikan semua project IT
  itProjects.forEach(project => project.style.display = "none");

  // Tampilkan semua project Design
  designProjects.forEach(project => project.style.display = "block");
});
  

const btnIT = document.getElementById('btn-it');
const btnDesign = document.getElementById('btn-design');

btnIT.addEventListener('click', function() {
  btnIT.classList.add('active');
  btnDesign.classList.remove('active');
  // Tambahkan logika untuk menampilkan project IT
});

btnDesign.addEventListener('click', function() {
  btnDesign.classList.add('active');
  btnIT.classList.remove('active');
  // Tambahkan logika untuk menampilkan project Design
});


 // Mendapatkan modal
  var modal = document.getElementById("imageModal");

  // Mendapatkan gambar dan elemen modal
  var modalImg = document.getElementById("modalImage");
  var captionText = document.getElementById("caption");

  // Menambahkan event klik ke gambar di dalam section portfolio
  var images = document.querySelectorAll(".portofolio-content img");
  images.forEach((img) => {
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    };
  });

  // Mendapatkan elemen close untuk menutup modal
  var closeBtn = document.getElementsByClassName("close")[0];

  // Tutup modal saat klik tombol X
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Tutup modal saat klik di area luar gambar
  modal.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };