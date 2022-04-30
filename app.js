//jshint esversion:6

// Required codes to run express, body parser, ejs

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const date = require(__dirname + "/date.js"); // Created a function in a module. Part of node.js functionality
const port = 3000; // Created a variable and assign a value of the port to use

app.use(bodyParser.urlencoded({ // Used to parse data from the webpage
  extended: true
}));

app.set("view engine", "ejs");

app.use(express.static("public")); // Location for static files

mongoose.connect("mongodb://localhost:27017/todoListDB", {
  useNewUrlParser: true
}); // Add mongoose Database

//Created a schema
const itemsSchema = {
  name: String
};

//Created a model that use the Schema
const Item = mongoose.model("Item", itemsSchema);

//Add documents to the Database

const item1 = new Item({
  name: "Welcome to your ToDo List."
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];


// Item.deleteOne({_id: '6268d6ed0b937738e41672e6' }, function(err){
//   if(err){
//     console.log(err);
//   }
//   else {
//     console.log("Successfully deleted one documents");
//   }
// });


//--------------- Load up to home page, to view the current date and list items

app.get("/", (req, res) => {

  const day = date.getDay(); // Acquire the value of the date today using a module. A function was created inside a module


  Item.find({}, function(err, foundItems) { // Acquire the value of items in your Database

    if (foundItems.length === 0) { // Check if the database is empty

      // Insert the items to the database
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB");
        }
      });

      res.redirect("/"); // redirect to the root after adding the default items in the Database

    } else {
      // Render EJS and pass the value of day (kindOfDay) and items(newListItems) to the FrontEnd (EJS file)
      res.render("list", {
        listTitle: day,
        newListItems: foundItems
      });
    }

  });

});


//--------------- Load up to home page, to view the current date and list items

//Express code. Handles the POST request, it will catch the data from newItem in FrontEnd

app.post("/", (req, res) => { //route to homepage

  let item = req.body.newItem; // the value of the newItem is stored to item using body parser

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item); // Push the item value to the items array
    res.redirect("/"); // Redirect to the home route
  }

});


app.get("/work", (req, res) => { //route to work page
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });

});


app.get("/about", (req, res) => { //route to about page
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
