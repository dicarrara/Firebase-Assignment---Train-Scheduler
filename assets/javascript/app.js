// we need to connect to firebase
// check if firebase have childs and display them on a screen (data base listener)
// every time user adding train it will be safe in firebase and display on a screen 
// (on submit safe info into database)
// use http://momentjs.com/
// 

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

//   on click of submit button we need to grab value and store it into database
$("#add-train-btn").on("click", function() {
    event.preventDefault();

    train=$("#train-name-input").val().trim();
    destination=$("#dest-input").val().trim();
    firstTrainInput=$("#firstTrain-input").val().trim();
    frequency=$("#freq-input").val().trim();

// safe info into database
    database.ref().set({
        train: train,
        destination: destination,
        firstTrainTime: firstTrainInput,
        frequency: frequency,
});

console.log("this is the price" + train)
});