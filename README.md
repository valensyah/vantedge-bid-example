# TenderDocs - Manajemen Dokumen Tender

Sistem manajemen dokumen tender terpusat untuk mengelola, memverifikasi, dan mengaudit kepatuhan berkas lelang secara terintegrasi. Dibangun menggunakan Next.js (App Router), Tailwind CSS v4, dan React 19.

---

## Prasyarat (Prerequisites)

Pastikan lingkungan lokal Anda telah terpasang:
- **Node.js**: versi 18.18.0 atau lebih baru (disarankan Node.js LTS 20+)
- **Package Manager**: `npm` (bawaan Node.js), `pnpm`, atau `yarn`

---

## Cara Menjalankan Aplikasi di Lokal (Getting Started)

### 1. Masuk ke Direktori Proyek
Buka terminal dan arahkan ke direktori proyek:
```bash
cd vantedge-bid-dashboard
```

### 2. Pasang Dependensi
Instal semua dependensi yang diperlukan:
```bash
npm install
# atau jika menggunakan pnpm:
pnpm install
# atau jika menggunakan yarn:
yarn install
```

### 3. Jalankan Server Pengembangan (Dev Server)
Mulai server Next.js dalam mode pengembangan:
```bash
npm run dev
# atau:
pnpm dev
# atau:
yarn dev
```

### 4. Buka di Browser
Setelah server berjalan, buka browser dan akses:
```
http://localhost:3000
```

---

## Perintah yang Tersedia (Available Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan lokal dengan fitur hot-reload |
| `npm run build` | Membuat build bundle produksi yang dioptimalkan |
| `npm run start` | Menjalankan server produksi hasil dari `npm run build` |
| `npm run lint` | Menjalankan pemeriksaan kode menggunakan ESLint |
| `npm run typecheck` | Menjalankan pengecekan tipe statis menggunakan TypeScript (`tsc --noEmit`) |
| `npm run format` | Memformat kode secara otomatis menggunakan Prettier |

---

## Struktur Direktori Utama (Project Structure)

```
├── app/
│   ├── dashboard/       # Server actions & tipe data dashboard
│   ├── globals.css      # Desain tema, CSS variables (@theme), & Tailwind v4
│   ├── layout.tsx       # Root layout aplikasi (Inter font & ThemeProvider)
│   └── page.tsx         # Halaman utama dashboard tender
├── components/
│   ├── dashboard/       # Komponen dashboard (CardSummaryStats, TableContent, DocumentDetailDialog)
│   ├── layout/          # Navbar & Footer
│   └── ui/              # Komponen UI dasar (Button, Dialog, Breadcrumb, dll.)
├── hooks/
│   └── use-debounce.ts  # Custom hook untuk debounce filter pencarian
└── public/              # Aset statis & favicon
```
