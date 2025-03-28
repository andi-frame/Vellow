# 🏃 **Vellow**  

**Vellow** adalah platform yang dirancang untuk mendorong aktivitas **lari** melalui **leaderboard kompetitif, tantangan berbasis performa, dan sistem battle antar pengguna**. Dengan integrasi ke **Strava**, pengguna dapat menghubungkan akun mereka untuk melacak statistik lari mereka secara otomatis.

## Nama Tim
Pelan2 semester 4
Anggota:
Andi Farhan Hidayat
Muhammad Raihaan Perdana
Nathanael Rachmat
Bagas Noor Fadhillah
Samantha Laquenna Ginting

## How To Run
Front-End
- cd frontend/
- npm install
- npm run dev

Back-End
- cd backend/
- go mod tidy
- air
## ✨ **Fitur yang Tersedia**  

### ✅ **Authentication dengan Google & Strava**  
- Pengguna dapat login menggunakan akun **Google** dan **Strava**.  
- Sistem akan mendapatkan **access token** dari Strava untuk mengambil data aktivitas pengguna.  

### 🏆 **Leaderboard**  
- Pengguna dapat melihat peringkat berdasarkan **lokasi dan tier**.  
- Opsi filter untuk melihat peringkat dalam skala **provinsi, nasional, dan global**.  
- Data aktivitas diambil dari Strava dan dihitung berdasarkan **running points** atau **total distance**.  

### 🔥 **Vellow Battle (Preview)**  
- Mode kompetisi yang sedang dikembangkan untuk menantang pengguna lain dalam aktivitas berlari.  
- Perbandingan performa berdasarkan **kecepatan, jarak tempuh, dan elevasi**.  

### 👤 **Profile (Preview)**  
- Pengguna dapat melihat data profil mereka berdasarkan **aktivitas terbaru di Strava**.
  
### ☁️ **Online Database**  
- Data pengguna, aktivitas, leaderboard, dan battle disimpan secara real-time di database **PostgreSQL (Supabase)**.  
- Update leaderboard dilakukan secara otomatis berdasarkan **data terbaru dari aktivitas di dalam Vellow dan Strava**
## Link Video Demo
https://drive.google.com/drive/folders/1Dar2iRJqpp7e-yAf-uDKCBueIWBx5II8?hl=ID 
