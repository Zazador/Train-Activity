  // Initialize Firebase
  var config2 = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId
  };
  firebase.initializeApp(config2);

  var database = firebase.database();
  console.log("1");

// Add train
$("#add-train-btn").on("click", function(event) {
  console.log("hi");
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "DD/MM/YY").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: trainName,
    role: trainDest,
    start: trainTime,
    rate: trainFreq
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().role;
  var trainTime = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  // Prettify the employee start
  var trainTimePretty = moment.unix(trainTime).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment.unix(trainTime, "X"), "months");
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * trainFreq;
  console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + "nextArrivalTemp" + "</td><td>" + "minutesAwayTemp" + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case