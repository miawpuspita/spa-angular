// controllers/prodiController.js
const index = (req, res) => {
    const prodis = [
        { nama: "Sistem Informasi", fakultas: "FIKR", singkatan: "SI" },
        { nama: "Informatika", fakultas: "FIKR", singkatan: "IF" },
        { nama: "Teknik Elektro", fakultas: "FT", singkatan: "TE" },
        { nama: "Manajemen Informatika", fakultas: "FIKR", singkatan: "MI" },
        { nama: "Manajemen", fakultas: "FEB", singkatan: "MJ" },
        { nama: "Akuntansi", fakultas: "FEB", singkatan: "AK" }
    ];

    res.render('prodi', { title: 'Halaman Prodi', prodis, layout: 'main' });
};

module.exports = {index}
