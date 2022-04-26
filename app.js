// Required codes to run express, body parser, ejs

const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const date = require(__dirname + "/date.js");
const port = 3000; // Created a variable and assign a value of the port to use

console.log(date());

app.use(bodyParser.urlencoded({ // Used to parse data from the webpage
  extended: true
}));

app.set("view engine", "ejs");

app.use(express.static("public")); // Location for static files

let items = ["Buy Food", "Cook Food", "Eat Food"]; //Created a variable to store initial list items
let workItems = [];

//--------------- Load up to home page, to view the current date and list items

app.get("/", (req, res) => {

const day = date();

  // Render EJS and pass the value of day (kindOfDay) and items(newListItems) to the FrontEnd (EJS file)
  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});


//--------------- Load up to home page, to view the current date and list items

//Express code. Handles the POST request, it will catch the data from newItem in FrontEnd

app.post("/", (req, res) => {

  let item = req.body.newItem; // the value of the newItem is stored to item using body parser

  console.log(req.body);

  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }
  else {
    items.push(item); // Push the item value to the items array
    res.redirect("/"); // Redirect to the home route
  }

});



app.get("/work", (req, res) => {
res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });

});

// app.post("/", (req, res) => {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });


app.get("/about", (req, res) => {
res.render("about");
});



// Check if the server is running.
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server listening to port " + port);
  }
});
