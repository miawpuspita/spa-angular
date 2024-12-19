// model prodi
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// definisakn schema untuk prodi
const prodiSchema = new mongoose.Schema({
    // field untuk nama prodi
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    // field untuk singkatan prodi
    singkatan: {
        type: String,
        required: true,
        trim: true,
    },
    fakultas_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fakultas",
        required: true,  
    },
    
    // field untuk menyimpan tanggal pembuatan data prodi
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// buat modul prodi dari skema yang telah didefinisikan
const Prodi = mongoose.model("Prodi", prodiSchema);

module.exports = Prodi;
