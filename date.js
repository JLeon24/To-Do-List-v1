module.exports = getDay;

function getDate(){
  let today = new Date(); // Created a variable to store the date today (method)

  //Created an object and assigned to a variable. Used to format the date
  let options = {
    weekday: "long",
    year: "numeric",
    day: "numeric",
    month: "long"
  }

  // added the object options as an argument and a callback to the variable day
  let day = today.toLocaleDateString("en-US", options);

  return day;
}


//Added a function to get the day
function getDay(){
  let today = new Date(); // Created a variable to store the date today (method)

  //Created an object and assigned to a variable. Used to format the date
  let options = {
    weekday: "long"
  }

  // added the object options as an argument and a callback to the variable day
  let day = today.toLocaleDateString("en-US", options);

  return day;
}
