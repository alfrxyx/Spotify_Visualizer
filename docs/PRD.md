# Product Requirements Document (PRD)

## Judul Proyek
**🎧 Streaming Showdown 2023: Siapa Menguasai Telinga Dunia?**

## Ringkasan
Website dashboard interaktif yang menampilkan visualisasi data lagu-lagu top Spotify tahun 2023. Fokusnya adalah mengeksplorasi tren musik, artis populer, dan karakteristik emosional lagu berdasarkan data streaming dan fitur audio.

---

## Fitur Visualisasi Utama

### 1. **Top Lagu Streaming 2023**
- **Pertanyaan**: Lagu apa yang paling banyak diputar pada tahun 2023?
- **Komponen Visual**: Table interaktif (`DataTable`) yang menampilkan `track_name`, `artist(s)_name`, `streams` — sorted descending.

### 2. **Total Streams per Artis**
- **Pertanyaan**: Siapa artis dengan total streams gabungan tertinggi?
- **Komponen Visual**: Bar chart horizontal (`streams` per artis) — agregasi total stream semua lagu per artis.

### 3. **Jumlah Lagu Hits per Artis**
- **Pertanyaan**: Siapa artis dengan jumlah lagu terbanyak di chart 2023?
- **Komponen Visual**: Bar chart horizontal (`count` lagu/artis).

### 4. **Pesta Perasaan Musik**
- **Pertanyaan**: Lagu-lagu hits 2023 lebih sering bikin happy atau mellow?
- **Komponen Visual**: Scatter plot `valence_%` vs `danceability_%`.
- **Insight Naratif**: Teks deskriptif di samping grafik, misalnya:
  > "Ternyata, lagu hits 2023 punya beat asyik untuk bergoyang, namun dengan nuansa yang sedikit melankolis."

### 5. **Statistik Umum Lagu**
- **Komponen Visual**: Metric Cards
  - Rata-rata `bpm`
  - Rata-rata `valence_%`
  - Rata-rata `energy_%`

---

## 🔍 Fitur Baru: Bedah ‘DNA Musik’ Taylor Swift vs Olivia Rodrigo

### 6. **Perbandingan Karakteristik Lagu Taylor Swift & Olivia Rodrigo**
- **Pertanyaan**: Siapa yang lagunya lebih "galau-able" antara Taylor Swift dan Olivia Rodrigo?
- **Data Digunakan**:
  - `energy_%`
  - `bpm`
  - `valence_%`

- **Komponen Visual**:
  - **Bar Chart (Side-by-Side)** untuk membandingkan rata-rata nilai ketiga fitur audio
    - x-axis: jenis fitur (`valence`, `energy`, `bpm`)
    - y-axis: nilai rata-rata
    - warna berbeda untuk setiap artis
  - **Alternatif**: Radar Chart untuk perbandingan fitur audio antar artis

- **Logika Analitik**:
  - Filter lagu berdasarkan kolom `artist(s)_name`
  - Hitung rata-rata `valence_%`, `energy_%`, dan `bpm` per artis
  - Gunakan dua warna: satu untuk Taylor Swift, satu untuk Olivia Rodrigo

- **Insight Naratif**:
  > “Taylor Swift ternyata punya nilai valence dan tempo sedikit lebih tinggi, tapi lagu Olivia Rodrigo cenderung lebih mellow dengan energy rendah — cocok buat nangis di pojokan kamar.”

---

## Stack Teknologi

- **Frontend**: React.js + Tailwind CSS + Shadcn UI
- **Visualisasi**: Recharts atau Chart.js
- **Data Source**: CSV dataset `spotify-2023.csv`, dimuat ke dalam state frontend
- **Opsional Backend**: Node.js Express (jika ingin menyajikan data via API)
- **Dark Mode UI**: Dominasi warna gelap seperti visual yang kamu kirim

---

## Layout Rencana

- **Grid Layout (2 kolom)**:
  - Kiri: Tabel dan Bar Chart
  - Kanan: Scatter plot dan Statistik
- **Insight Naratif**: Teks pendek ditampilkan sebagai quote di samping grafik
- **Responsive UI**: Tetap nyaman dibuka di laptop/tablet

---

## Deliverables

- Halaman Web Dashboard Interaktif (React App)
- Dataset musik dimuat secara lokal dari file CSV
- Seluruh pertanyaan terjawab dalam bentuk visual
- Insight naratif sebagai penguat interpretasi data
