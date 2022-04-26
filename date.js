console.log(module)


function getDate(){

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
