//Instalasi App
- pastikan sudah menjalankan app bakcend dengan melakukan "npm run dev" di app-be
- "npm install" untuk menginstal package
- "npm run start" untuk menjalankan app

routes:
- http://localhost:3000/  ( ke halaman home kosong hanya diarahkan untuk login/register saja)
- http://localhost:3000/login ( untuk login)
- http://localhost:3000/regis ( untuk regis)
- http://localhost:3000/user ( list data karyawan/user *diharuskan login apabila tidak data akan kosong)
- http://localhost:3000/user/adduser( untuk tambah user/karyawan)
- http://localhost:3000/profile ( untuk melihat profile akun)
- http://localhost:3000/user/settingprofile/:id ( untuk update profile dan hapus akun)