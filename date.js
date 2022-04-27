//jshint esversion:6

module.exports.getDate = function() { //refactor to anonymous function
  let today = new Date(); // Created a variable to store the date today (method)

  //Created an object and assigned to a variable. Used to format the date
  let options = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "long"
  }

  // added the object options as an argument and a callback to the variable day
  return today.toLocaleDateString("en-US", options); //refactor and removed the variable
}

//Added a function to get the day, didn't refactor these line of codes as a comparison
module.exports.getDay = getDay;

function getDay() {
  let today = new Date(); // Created a variable to store the date today (method)

  //Created an object and assigned to a variable. Used to format the date
  let options = {
    weekday: "long"
  }

  // added the object options as an argument and a callback to the variable day
  let day = today.toLocaleDateString("en-US", options);

  return day;
}

///console.log(module.exports);
