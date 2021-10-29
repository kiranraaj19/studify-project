const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

//static files

app.use(express.static('public'));
app.use('/css',express.static(__dirname+ 'public/css'));
app.use('/js',express.static(__dirname+ 'public/js'));
app.use('/img',express.static(__dirname+ 'public/img'));
app.use('/audios',express.static(__dirname+ 'public/audios'));


//set views 

app.set('views','./views');
app.set('view engine','ejs');

app.get('', (req,res)=> {
    res.render('main');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })