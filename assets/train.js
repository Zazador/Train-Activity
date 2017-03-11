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
// Add train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
  var trainFreq = $("#frequency-input").val().trim();

  // Create object for train
  var newEmp = {
    name: trainName,
    role: trainDest,
    start: trainTime,
    rate: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newEmp);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  return false;
});

// Add to Firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().role;
  var trainTime = childSnapshot.val().start
  var trainFreq = childSnapshot.val().rate;
  var trainMoment = moment(childSnapshot.val().start, "HH:mm");
  var trainArrival;
  var trainAway;

  // Calculate next train arrival
  var now = moment();
  while (trainMoment.isBefore(now)) {
    trainMoment.add(trainFreq, "m");
  }

  // Calculate the minutes away of train
  trainAway = trainMoment.diff(now, "m");

  // Format arrival time of train
  trainArrival = trainMoment.format("h:mm a").toString();

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFreq + "</td><td>" + trainArrival + "</td><td>" + trainAway + "</td></tr>");
});
