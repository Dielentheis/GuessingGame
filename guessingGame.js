/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateRandomNumber(),
    guesses = [], numberOfGuessesAllowed = 5, hasWon = false;
    // if you change the number of guesses allowed remember to update the starter HTML

/* **** Guessing Game Functions **** */

// generates the Winning Number
function generateRandomNumber(){
	return Math.floor((Math.random() * 100));
}

// fetches the Player's Guess from input field
function playersGuessSubmission(){
	playersGuess = +$('#answer').val();
}

// determines if the next guess should be a lower or higher number (and approx. distance)
function lowerOrHigher(){
	var lowOrHigh = '';
	var dist = '';
	var difference = playersGuess - winningNumber;

	if(guesses.length == numberOfGuessesAllowed) {
		$('body').css({'background-image': 'url("Sad.png")'});
		return "YOU LOSE. Sorry dude. We can't all be winners."
	}

	if (difference > 0) {
		lowOrHigh = "higher";
	}
	else {
		lowOrHigh = "lower";
	}
	if ((Math.abs(difference) > 0) && (Math.abs(difference) < 6)) {
		dist = 'within 5';
	}
	else if ((Math.abs(difference) > 5) && (Math.abs(difference) < 11)) {
		dist = 'within 10';
	}
	else if ((Math.abs(difference) > 10) && (Math.abs(difference) < 21)) {
		dist = 'within 20';
	}
	else {
		dist = 'more than 20';
	}
	return "Oof, incorrect. Your guess is " + lowOrHigh + " and is " + dist + " digits from the winning number.";
}

// checks if the Player's Guess is the winning number 
function checkGuess(){
	// code will only run if there are no input errors
	if (errorCheck()) {
		guesses.push(playersGuess);

		if (playersGuess == winningNumber) {
			hasWon = true;
			$('#dialog').text("Correct! YOU WIN!");
			$('body').css({'background-image': 'url("Happy-Baby.png")'});
			$('#dialog').dialog("open");
		}
		else {
			var message = lowerOrHigher();
			$('#dialog').text(message);
			$('#dialog').dialog("open");
			$('#gL').text((numberOfGuessesAllowed - guesses.length));
			changeGuessColor();
		}
	}
	return;
}

// checks for valid input and makes sure player is following rules
function errorCheck() {
	// checks if player already won
	if (hasWon) {
		$('#dialog').text("You already won! Get outta here. Or play again. Up to you.");
		$('#dialog').dialog("open");
		return false;
	}
	// checks if player has any guesses left
	if (guesses.length == numberOfGuessesAllowed) {
		$('#dialog').text("You've already used all of your guesses! Click 'Play Again' to play again.");
		$('#dialog').dialog("open");
		return false;
	}
	// checks for valid input (1-100)
	if ((playersGuess > 100) || (playersGuess < 1)) {
		$('#dialog').text("Please enter a number between 1 and 100!");
		$('#dialog').dialog("open");
		return false;
	}
	// checks if player has already guessed the number
	for (var i = 0; i < guesses.length; i++) {
		if (playersGuess == guesses[i]) {
			$('#dialog').text("This guess has already been entered - guess again!");
			$('#dialog').dialog("open");
			return false;
		}
	}
	return true;
}

// changes color based on how many guesses are left
function changeGuessColor() {
	if (guesses.length == (numberOfGuessesAllowed - 2)) {
		$("#gL").css({ 'color': '#FFCC66' })
	}
	if (guesses.length == (numberOfGuessesAllowed - 1)) {
		$("#gL").css({ 'color': '#FF8080' })
	}
}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
	if (guesses.length == 0) {
		$('#dialog').text("You haven't even guessed yet? At least TRY.");
		$('#dialog').dialog("open");
		return;
	}
	var hintArr = [0, 0, 0];
	// puts winning number in a random spot in the array
	hintArr[Math.floor(Math.random() * 3)] = winningNumber;
	for (var i = 0; i < hintArr.length; i++) {
		if (hintArr[i] == 0) {
			hintArr[i] = generateRandomNumber();
		}
	}
	$('#dialog').text("The winning number is one of these: \n \n" + hintArr.join(", "));
	$('#dialog').dialog("open");
}

// allows the "Player" to Play Again
function playAgain(){
	location.reload();
}


/* **** Event Listeners/Handlers ****  */
$(document).ready( function () {
	// listens for players to enter their guess with button
	$('#guessbtn').on('click', function() {
		event.preventDefault();
		playersGuessSubmission();
		checkGuess();
	});
	// listens for enter key to enter guess
	$('#answer').keypress(function(event){
		// honestly I C&Ped this line from Stack Overflow but I understand it
    	var keycode = (event.keyCode ? event.keyCode : event.which);
    	if(keycode == '13'){
	        event.preventDefault();
			playersGuessSubmission();
			checkGuess(); 
    	}
	});
	$('#hint').on('click', function() {
		event.preventDefault();
		provideHint();
	});
	$('#playagain').on('click', function() {
		event.preventDefault();
		playAgain();
	});
	// prevents dialog boxes from auto-opening on page load and sets some properties
	$(function() {
        $("#dialog" ).dialog({
            autoOpen: false,
            draggable: false,
            modal: true,
            minHeight: 110,
            maxHeight: 200,
        });
	});
});













