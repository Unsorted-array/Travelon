var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyparser.urlencoded({extended : true}))


mongoose.connect("mongodb://localhost/travelon",{useMongoClient:true});
// schema setup

var locationsSchema= new mongoose.Schema({
    name: String,
    img: String,
    description : String
})

var location = mongoose.model("location",locationsSchema);


app.set('view engine','ejs')
app.get('/',function (req,res) {

    res.render("landing")
})

// index route
app.get('/locations',function (req,res) {

    location.find({},function (err,locations) {
        if(err)
        {
            console.log(err);
        }
        else {
           // console.log(locations);
            res.render("location",{locations :locations})

        }

    })



})

// add a new route
app.get('/locations/new',function (req,res) {

    res.render('new')
})

// create route !
app.post('/locations',function (req,res) {
    //get data from form and add to array
    // redirect back to campgrounds page
    var name = req.body.name;
    var image =req.body.img;
    var desc =req.body.description;
    var newlocation ={name:name,img:image,description:desc};
    location.create(newlocation,function (err,newlycreated) {
        if(err)
        {
            console.log(err);
        }
        else {
            res.redirect('/locations')

        }
    })





})


// show route for the process
app.get("/locations/:id",function (req,res) {

    location.findById(req.params.id ,function (err,found) {
        if(err)
        {
            console.log("error");
        }
        else {
            res.render("show",{location2:found});

        }
    });

})

app.listen(8000,function () {
    console.log('Server is running ! ')
})