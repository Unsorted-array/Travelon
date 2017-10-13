var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended : true}))

var locations =[ {name : "Manali" ,img : "https://farm5.staticflickr.com/4085/4837609363_0ec4a8c9b3.jpg"},
    {name : "kullu" ,img : "https://farm1.staticflickr.com/748/21623620690_b8bf9051a3.jpg"},
    {name : "leh" ,img : "https://farm8.staticflickr.com/7356/9669339783_6fd63cef04.jpg"}
]


app.set('view engine','ejs')
app.get('/',function (req,res) {

    res.render("landing")
})


app.get('/locations',function (req,res) {

    res.render("location",{locations :locations })

})

app.get('/locations/new',function (req,res) {

    res.render('new')
})

app.post('/locations',function (req,res) {
    //get data from form and add to array
    // redirect back to campgrounds page
    var name = req.body.name;
    var image =req.body.img;
    var newlocation ={name:name,img:image};
    locations.push(newlocation);
    res.redirect('/locations')



})

app.listen(8000,function () {
    console.log('Server is running ! ')
})