// Required code to use express, bodyParser
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Required code to use EJS
app.set("view engine", "ejs");

// code to use body parser to get the value from the textbox
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create a variable array to hold the items.
var items = ["Buy Food", "Cook Food", "Eat Food"];

//------------------------------------------------------------------

//Load up to home page, to view the current date and list items

//Express code. Handles the GET request
app.get("/", function(req, res) {

  // Create a variable to hold the the date and time (method)
  var today = new Date();

  //Create a variable to hold an Object to format the date
  var options = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "long"
  }

  //Create a variable to hold the date to string format
  var day = today.toLocaleDateString("en-US", options);

  // Render EJS and Pass the var day (kindOfDay) and items(newListItems) to the FrontEnd (EJS file)
  res.render("list", {
    kindOfDay: day,
    newListItems: items
  });

});

//------------------------------------------------------------------

//Express code. Handles the POST request, it will catch the data from newItem in FrontEnd
app.post("/", function(req, res) {
  var item = req.body.newItem; // the value of the newItem is stored to var item. Used bodyparser to get the value.
  items.push(item); // add the item to the array items
  res.redirect("/"); // redirect to the home route
});


// Confirmation for the node server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
