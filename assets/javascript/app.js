// we need to connect to firebase
// check if firebase have childs and display them on a screen (data base listener)
// every time user adding train it will be safe in firebase and display on a screen
// (on submit safe info into database)
// use http://momentjs.com/
//
$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDpH_0sH7F7-tNOuPuAKGD55ZZ0DiPLfr8",
    authDomain: "train-schedule-project-c0a59.firebaseapp.com",
    databaseURL: "https://train-schedule-project-c0a59.firebaseio.com",
    projectId: "train-schedule-project-c0a59",
    storageBucket: "train-schedule-project-c0a59.appspot.com",
    messagingSenderId: "739190935932"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var train = "";
  var destination = "";
  var firstTrainInput = 0;
  var frequency = 0;

  //   on click of submit button we need to grab value and store it into database
  $("#add-train-btn").on("click", function() {
    event.preventDefault();

    train = $("#train-name-input")
      .val()
      .trim();
    destination = $("#dest-input")
      .val()
      .trim();
    firstTrainInput = $("#firstTrain-input")
      .val()
      .trim();
    frequency = $("#freq-input")
      .val()
      .trim();

    var newTrain = {
      trainName: train,
      trainDestination: destination,
      trainStart: firstTrainInput,
      trainFrequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    // safe info into database
    database.ref().push(newTrain);

    //  clear text boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#firstTrain-input").val("");
    $("#freq-input").val("");
  });

  database.ref().on(
    "child_added",
    function(childSnapshot) {
      console.log(childSnapshot.val());

      // store child in a var
      train = childSnapshot.val().trainName;
      destination = childSnapshot.val().trainDestination;
      firstTrainInput = childSnapshot.val().trainStart;
      frequency = childSnapshot.val().trainFrequency;
      timeTrainAdded = childSnapshot.val().dateAdded;

      var frequency;
      var firstTime = 0;

      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      // update html
      $("#train-table > tbody").append(
        "<tr><td>" +
          train +
          "</td><td>" +
          destination +
          "</td><td>" +
          frequency +
          "</td><td>" +
          moment(nextTrain).format("HH:mm") +
          "</td><td>" +
          tMinutesTillTrain +
          "</td></tr>"
      );
    },
    function(errorObject) {
      // In case of error this will print the error
      console.log("The read failed: " + errorObject.code);
    }
  );
});
