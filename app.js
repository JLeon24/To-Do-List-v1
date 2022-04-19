// Required code to run express
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Required code to use EJS
app.set("view engine", "ejs");

// 
app.get("/", function(req, res){

    var today = new Date(); // Get the date for today
    var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]; // Created an array to get the name of the day
    var day = weekday[today.getDay()]; //Get the day today

    res.render("list", {
        kindOfDay: day
    }); //Pass the day today to the EJS file

});

// Confirmation for the node server
app.listen(3000, function(){
    console.log("Server started on port 3000");
});
