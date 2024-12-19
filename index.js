const express = require("express") // impor modul express
const app = express() // inisialisasi express
const expressLayout = require("express-ejs-layouts"); // input modul express-ejs-layouts
const port = 3000;// port

app.set("views", __dirname +"/views");
app.set("view engine", "ejs");

app.use(expressLayout);
app.use(express.static("public"));

// route/
app.get("/home", (req,res) => {
   // res.sendFile(__dirname + "/index.html");

   const berita =[
    {
        judul : "Berita 1",
        isi : "Isi Berita 1"
    },
    {
        judul : "Berita 2",
        isi : "Isi Berita 2"
    },
   ];
   res.render('index', {title: 'Halaman Home', berita,  layout:'main'});
})

//route/about
app.get("/about", (req, res)=>{
    //res.sendFile(__dirname + "/about.html");
    res.render('about',  {title: 'Halaman About', layout:'main'});
});

//route/contact
app.get("/contact", (req, res)=>{
    //res.sendFile(__dirname + "/contact.html");
    res.render('contact', {title: 'Halaman Contact', layout:'main'});
});

app.get("/prodi", (req, res) => {
    const prodis = [
        { nama: "Sistem Informasi", fakultas: "FIKR", singkatan: "SI" },
        { nama: "Informatika", fakultas: "FIKR", singkatan: "IF" },
        { nama: "Teknik Elektro", fakultas: "FT", singkatan: "TE" },
        { nama: "Manajemen Informatika", fakultas: "FIKR", singkatan: "MI" },
        { nama: "Manajemen", fakultas: "FEB", singkatan: "MJ" },
        { nama: "Akuntansi", fakultas: "FEB", singkatan: "AK" }
    ];
    
    res.render('prodi', { title: 'Halaman Prodi', prodis, layout:'main'});
})


// route /mahasiswa
app.get("/mahasiswa", (req, res) => {
    res.json({
        "status": "success",
        "message": "Data mahasiswa",
        "data": [
            { npm: 222624001, nama: "Angel" },
            { npm: 222624002, nama: "Budi" },
            { npm: 222624003, nama: "Cindy" }
        ]
    });
});

// route /dosen
app.get("/dosen", (req, res) => {
    res.json({
        "status": "success",
        "message": "Data dosen",
        "data": [
            { prodi: "Sistem Informasi", dosen: ["Iis", "Faris","Dafid"] },
            { prodi: "Informatika", dosen: ["Derry", "Siska", "Yohannes"] }
        ]
    });
});


// handle route yg tdk terdaftar
app.use("/", (req,res)=> {
    res.send("<h1>404 Not Found</h1>");
});

// jalankan server
app.listen(port, ()=>{
    console.log(`Server dapat diakses di http://localhost:${port}`);
});
