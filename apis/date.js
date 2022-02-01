exports.getDate = function () {

  // Set the current Day options
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  return today.toLocaleDateString("en-US", options);
}
