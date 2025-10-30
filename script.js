// --- Tema Gelap / Terang ---
const toggleTema = document.getElementById('toggleTema');
if (toggleTema) {
  toggleTema.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    toggleTema.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('temaGelap', isDark);
  });

  // Simpan tema user
  if (localStorage.getItem('temaGelap') === 'true') {
    document.body.classList.add('dark');
    toggleTema.textContent = '☀️';
  }
}

// --- Fitur Keranjang ---
const tombolBeli = document.querySelectorAll('.btn-beli');
if (tombolBeli) {
  tombolBeli.forEach(btn => {
    btn.addEventListener('click', () => {
      const nama = btn.dataset.nama;
      const harga = parseInt(btn.dataset.harga);
      const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
      keranjang.push({ nama, harga });
      localStorage.setItem('keranjang', JSON.stringify(keranjang));
      tampilkanKeranjang();
      alert(`${nama} ditambahkan ke keranjang 🛍️`);
    });
  });
}

// --- Tampilkan keranjang ---
function tampilkanKeranjang() {
  const daftar = document.getElementById('daftarKeranjang');
  const total = document.getElementById('totalHarga');
  if (!daftar || !total) return;

  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  daftar.innerHTML = '';
  let totalHarga = 0;

  keranjang.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.nama} - Rp ${item.harga.toLocaleString()} <button class="hapus" data-index="${i}">X</button>`;
    daftar.appendChild(li);
    totalHarga += item.harga;
  });

  total.textContent = `Total: Rp ${totalHarga.toLocaleString()}`;

  // Hapus item
  daftar.querySelectorAll('.hapus').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      keranjang.splice(index, 1);
      localStorage.setItem('keranjang', JSON.stringify(keranjang));
      tampilkanKeranjang();
    });
  });
}
tampilkanKeranjang();

// --- Pembayaran ---
const formPembayaran = document.getElementById('formPembayaran');
if (formPembayaran) {
  formPembayaran.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value.trim();
    const alamat = document.getElementById('alamat').value.trim();
    const metode = document.getElementById('metode').value;

    if (!nama || !alamat || !metode) {
      alert('Harap lengkapi semua data pembayaran!');
      return;
    }

    const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    if (keranjang.length === 0) {
      alert('Keranjang masih kosong!');
      return;
    }

    alert(`Terima kasih, ${nama}! Pesanan Anda dengan metode ${metode.toUpperCase()} sedang diproses.`);
    localStorage.removeItem('keranjang');
    formPembayaran.reset();
  });
}
