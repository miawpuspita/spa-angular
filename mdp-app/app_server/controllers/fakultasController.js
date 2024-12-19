// mengimpor axios untuk melakukan HTTP request
const axois = require("axios");

const index = async (req, res) => {
    try{
        // mendapatlan data fakultas dari API eksternal
        const response = await axois.get(
            "https://crud-express-seven.vercel.app/api/fakultas"
        );

        // data fakuktas dari nAPI
        const fakultas = response.data;

        // render galaman 'fakultas' dengan data yang diperoleh dari API
        res.render("fakultas",{
            title: "halaman fakultas",
            fakultas,
            layputs: "main",
        });
    } catch (error){
        //jika terjadi kesalahan saat mengambil data dari API
        console.error(error.message);
        res.status(500).send("gagal mendapatkan data fakultas dari API")
    }
};
module.exports = {index};