export { isValidDate };

function isValidDate(inputText) {
  let selectedDate = Date.parse(inputText);
  let result = {
    valid: true,
    message: "date check successful"
  };
  console.log("::: Running Date Check :::", selectedDate, Date.now());

  // no date selected?
  if (typeof selectedDate === "undefined" || isNaN(selectedDate)) {
    result.valid = false;
    result.message = "please provide a date";
  } // is selected date in the past?
  else if (Date.now() > selectedDate) {
    result.valid = false;
    result.message = "selected start date is in the past";
  }
  return result;
}
