var config = {
    apiKey: "AIzaSyDETqO2d44BQBLxhqkRuUbGYa1jJQMi4Ls",
    authDomain: "train-time-188e2.firebaseapp.com",
    databaseURL: "https://train-time-188e2.firebaseio.com",
    projectId: "train-time-188e2",
    storageBucket: "train-time-188e2.appspot.com",
    messagingSenderId: "855151789604"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $('#add-train-btn').on('click', function(event){
  	event.preventDefault();

  	var trainName = $('#train-input').val().trim();
  	var destination = $('#destination-input').val().trim();
  	var trainTime = moment($('#train-time-input').val().trim(), "HHmmss").format('HHmmss');
  	var frequency = $('#frequency-input').val().trim();

  	var newTrain = {
  		name: trainName,
  		destination: destination,
  		time: trainTime,
  		frequency: frequency
  	};

  	database.ref().push(newTrain);

  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.time);
  	console.log(newTrain.frequency);

  	alert('Train added successfully');

  	$('#train-input').val('');
  	$('#destination-input').val('');
  	$('#train-time-input').val('');
  	$('#frequency').val('');
  });

  database.ref().on('child_added', function(childSnapshot, prevChildKey) {
  	

  	var trainName = childSnapshot.val().name;
  	var destination = childSnapshot.val().destination;
  	var trainTime = childSnapshot.val().time;
  	var frequency = childSnapshot.val().frequency;

  	console.log(trainName);
  	console.log(destination);
  	console.log(trainTime);
  	console.log(frequency);

  	var trainStart = moment.unix(trainTime).format('HHmm');

  	var nextArrival = moment().diff(moment().minutes(trainTime, "HHmmss"), "HH:mm:ss");
  	console.log(nextArrival);

  	var minutesAway = nextArrival - frequency;
  	console.log(minutesAway);

  	$('#train-table > tbody').append('<tr><td>' + trainName + '</td><td>' + destination + "</td><td>" + frequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>');




  });