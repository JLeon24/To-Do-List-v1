//jshint esversion:6

// Required codes to run express, body parser, ejs, lodash

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js"); // Created a function in a module. Part of node.js functionality
const port = 3000; // Created a variable and assign a value of the port to use
const _ = require("lodash"); // Required to run lodash
const app = express();

app.use(bodyParser.urlencoded({ // Used to parse data from the webpage
  extended: true
}));

app.set("view engine", "ejs"); // Required to run EJS

app.use(express.static("public")); // Location for static files

mongoose.connect("mongodb://localhost:27017/todoListDB", {useNewUrlParser: true}); // Add mongoose Database

// Items Schema (mongoose)
const itemsSchema = {
  name: String
};

// Created a model that use the Item Schema (mongoose)
const Item = mongoose.model("Item", itemsSchema); // <"SingularCollectionName">, <schemaName>


// Add documents to the Database using the schema (mongoose)
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

// List Schema. Used for custom ToDo List (mongoose)
const listSchema = {
  name: String,
  items: [itemsSchema] // Used the itemsSchema as a property of the listSchema items
}

// Created a model that use the List Schema for custom ToDo List(mongoose)
const List = mongoose.model("List", listSchema); //<"SingularCollectionName">, <schemaName>

//--------------- Load up to Default page for ToDo List (express)
app.get("/", (req, res) => {

  const day = date.getDay(); // Acquire the value of the date today using a module. A function was created inside a module
  
  Item.find({}, function(err, foundItems) { // Acquire the value of items in your Database using item.find({condition},callback)
    if (foundItems.length === 0) { // Check if the database is empty

      // Insert the default items to the database
      Item.insertMany(defaultItems, function(err) {
        if (!err) {
          console.log(err);
        } 
        else {
          console.log("Successfully saved default items to DB");
        }
      });

      res.redirect("/"); // redirect to the root after adding the default items or new items in the Database

    } 
    else {
      // Render EJS and pass the value of foundItems(newListItems) to the FrontEnd (EJS file)
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems 
      });
    }

  });

});
//--------------- Load up to Default page for ToDo List



//--------------- Load up to custom ToDo List (express)
app.get("/:customListName", function(req, res) { //Used :customListName as PATH to obtain the path user make in creating a new list 

    const customListName = _.capitalize(req.params.customListName); // Create a variable to store the Custom List Name. 
    // Used lodash to capitalized the first letter of path. 
    // Used req.params to obtain the value of Custom List Name. (Express Route Parameter: used to capture the value/s specified at their position in the URL.) 

    List.findOne({name: customListName}, function(err, foundList) { // Check if the list was already created
      if (!err) {
        if (!foundList) {
          // Create a new list using list schema
          const list = new List({
            name: customListName,
            items: defaultItems
          });
          list.save(); // Save the created document to the database
          res.redirect("/" + customListName); // redirect to the cutom ToDoList page after adding new item in the Database
        } 
        else {
          // Show an existing list 
          res.render("list", {
            listTitle: foundList.name,
            newListItems: foundList.items
          });
        }
      }
    });
  });
  //--------------- Load up to custom ToDo List


// Handles the POST request, it will catch the data from the FrontEnd (express)

// Add Document
app.post("/", (req, res) => { 
  const itemName = req.body.newItem; // Obtain the value from newItem and store the it to itemName
  const listName = req.body.list; // Obtain the value from list and store it to listName, used to check for custom ToDo List

  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save(); // Save new item
    console.log("Successfully added an item in ToDo List");
    res.redirect("/"); // Redirect to the home route
  } 
  else {
    List.findOne({name: listName}, function(err, foundList) { // Check route for custom ToDo List
      foundList.items.push(item); // Push the item to items
      foundList.save(); // Save new item in custom ToDo List
      console.log("Successfully added an item in custom ToDo List");
      res.redirect("/" + listName); // Redirect to custom ToDo List
    });
  }

});

// Remove Document
app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox; // Obtain the value if the checkbox is triggered

  const listName = req.body.listName; // Obtain the value from the input with the name listName

  if (listName === "Today") { 
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        console.log("Successfully deleted checked item in ToDo List");
        res.redirect("/");
      }
    });
  } 
  else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
      if (!err) {
        console.log("Successfully deleted checked item in custom ToDo List");
        res.redirect("/" + listName);
      }
    });
  }

});


// About page 
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
