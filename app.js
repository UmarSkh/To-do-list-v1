// comment

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.set('view engine', 'ejs');

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = ["See Emails"];

app.get("/", function(req, res){
    // res.send("Hello");

    // let day = date.getDay();
    let day = date.getDate();


    res.render("list", {listTitle : day, newListItems : items});
});

app.post("/", function(req, res){
    let item = req.body.newItem;
    // items.push(item);
    if(req.body.list === "work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res){
    res.render("list", {listTitle : "work", newListItems : workItems})
})

app.get("/about", function(req, res){
    res.render("about");
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
});