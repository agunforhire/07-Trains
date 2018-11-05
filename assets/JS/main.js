  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC9MyenW680ejxN14s6VjRIGFzDB07jAC0",
    authDomain: "train-scheduler-8cef1.firebaseapp.com",
    databaseURL: "https://train-scheduler-8cef1.firebaseio.com",
    projectId: "train-scheduler-8cef1",
    storageBucket: "",
    messagingSenderId: "744688618278"
  };
  firebase.initializeApp(config);



var trainData = firebase.database().ref();
//Shows user the current time
$("#currentTime").append(moment().format("hh:mm A"));

// Button for adding trains
$("#addTrainBtn").on("click", function() {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#trainInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    // Creates local object for holding train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    // Uploads train data to the database
    trainData.push(newTrain);

    // Alert
    alert(newTrain.name + " has been successfully added");

    // Clears all of the text-boxes
    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

    return false;
});


// Adds train data to the database and appends to DOM
trainData.on("child_added", function(childSnapshot) {

    var data = childSnapshot.val();
    var trainNames = data.name;
    var trainDestin = data.destination;
    var trainFrequency = data.frequency;
    var theFirstTrain = data.firstTrain;
    
    var tRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
    var tMinutes = trainFrequency - tRemainder;

    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    $("#trainTable > tbody").append("<tr><td>" + trainNames + "</td><td>" + trainDestin + "</td><td class='min'>" + trainFrequency + "</td><td class='min'>" + tArrival + "</td><td class='min'>" + tMinutes + "</td></tr>");

});