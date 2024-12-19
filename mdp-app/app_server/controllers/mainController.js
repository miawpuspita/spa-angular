const index =(req,res)=> {
    /* GET home page. */
  
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
}

const about = (req,res) => {
     res.render('about',  {title: 'Halaman About', layout:'main'});
}

const contact = (req,res) => {
     res.render('contact',  {title: 'Halaman Contact', layout:'contact'});
}

module.exports = {index, about, contact}
