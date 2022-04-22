// Required codes to run express, body parser, ejs
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
var port = 3000; // Created a variable and assign a value of the port to use

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");


var items = ["Buy Food", "Cook Food", "Eat Food"]; //Created a variable to store initial list items

//--------------- Load up to home page, to view the current date and list items


app.get("/", (req, res) => {

  var today = new Date(); // Created a variable to store the date today (method)

  //Created an object and assigned to a variable. Use to format the date
  var options = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "long"
  }

  // Created a variable and assign the var options as a callback to the object today.toLocaleDateString("en-US", options
  var day = today.toLocaleDateString("en-US", options);

  // Render EJS and Pass the var day (kindOfDay) and items(newListItems) to the FrontEnd (EJS file)
  res.render("list", {
    kindOfDay: day,
    newListItems: items
  });

});


//--------------- Load up to home page, to view the current date and list items

//Express code. Handles the POST request, it will catch the data from newItem in FrontEnd
app.post ("/", (req, res) => {
  var item = req.body.newItem; // the value of the newItem is stored to var item using body parser
  items.push(item); // Push the item value to the items array
  res.redirect("/"); // Redirect to the home route

});



// Check if the server is running.
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server listening to port " + port);
  }
});
