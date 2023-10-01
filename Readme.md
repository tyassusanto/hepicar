# Hepicar

Aplikasi sederhana yang dapat untuk mencari rute pengiriman barang. Aplikasi ini dibangun menggunakan NodeJs dengan Framework Express JS React JS juga database MySQL. Aplikasi ini juga menggunakan beberapa package seperti : 
1. bcrypt yang bertujuan meng-enkripsi.
2. cors untuk menjalankan mekanisme yang digunakan oleh browser untuk mengizinkan permintaan HTTP lintas domain.
3. dotenv yang bertujuan untuk menyembunyikan beberapa informasi penting, seperti misalnya koneksi database dll.
4. express sebagai kerangka kerja utama.
5. jsonwebtoken bertujuan untuk otentikasi dan otorisasi dalam aplikasi
6. mysql2 digunakan untuk mengkoneksikan aplikasi dengan database MySQL
7. nodemon sebagai alat pengembangan untuk aplikasi Node.js yang memungkinkan Anda untuk secara otomatis memulai ulang aplikasi Node.js setiap kali ada perubahan pada file-file di direktori proyek Anda.
8. uuid sebagai generator unik id.
9. http-errors library untuk membatu membuat error handling.
10. axios
11. react-router-dom
12. antdesign
13. bootstrap

## Instalasi Server

1. Pastikan Node.js terinstal di sistem Anda. Anda dapat mengunduhnya dari [situs resmi Node.js](https://nodejs.org).
2. Clone repositori ini ke direktori lokal Anda dengan cara `git clone https://github.com/tyassusanto/hepicar`.
3. Masuk ke direktori cloning dan pindah ke folder be
5. Install dependensi yang diperlukan dengan cara `npm install`.
6. Jalankan server dengan cara ketikan command `npm run dev` didalam folder be
## Instalasi Server

1. Masuk ke direktori cloning dan pindah ke folder fe
2. Install dependensi yang diperlukan dengan cara `npm install`.
3. Jalankan server dengan cara ketikan command `npm start` didalam folder fe

## Konfigurasi

Buat file `.env` berdasarkan kebutuhan yaitu : 
1. DB_HOST = host url 
2. DB_USERNAME = username database anda
3. DB_PASSWORD = password database anda
4. DB_NAME = nama database anda

## Penggunaan

1. Import file dump database ke dalam database yang telah clone ke database anda.
2. Jalankan server dengan mengetikan perintah `npm run dev` didalam folder be.
3. Jalankan client dengan mengetikan perintah `npm start` didalam folder fe.
4. Anda dapat login kedalam aplikasi dengan memasukan email : admin@admin.com dan password : samasama

## Dokumentasi API 
Anda dapat mengakses dokuemntasi api dan mentestnya melalui web brower anda dengan url : https://documenter.getpostman.com/view/18911776/2s9YJaZPjh
