/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateWinningNumber(),
    guesses = [], numberOfGuessesAllowed = 3;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor((Math.random() * 100));
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = +$('#answer').val();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// ADD GUESSES REMAINING
	if (guesses.length == 3) {
		$('#stopGuessing').dialog("open");
		return;
	}
	for (var i = 0; i < guesses.length; i++) {
		if (playersGuess == guesses[i]) {
			// change to a different way
			//alert("This guess has already been entered - guess again!");
			$('#alreadyEntered').dialog("open");
			return;
		}
	}
	if ((playersGuess > 100) || (playersGuess < 1)) {
		//alert("Please enter a number between 1 and 100!");
		$('#invalidNum').dialog("open");
		return;
	}

	guesses.push(playersGuess);

	if (playersGuess == winningNumber) {
		// change to a different way
		$('#win').dialog("open");
	}
	else {
		$('#guessAgainDialogue').dialog("open");
		$('#gL').text((3 - guesses.length));
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
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
		// honestly I C&Ped this from Stack Overflow but I understand it
    	var keycode = (event.keyCode ? event.keyCode : event.which);
    	if(keycode == '13'){
	        event.preventDefault();
			playersGuessSubmission();
			checkGuess(); 
    	}
	});
	// prevents dialog boxes from auto-opening on page load
	$(function() {
        $("#guessAgainDialogue" ).dialog({
            autoOpen: false,
            draggable: false,
            modal: true,
            height: 110,
        });
        $("#alreadyEntered" ).dialog({
            autoOpen: false,
            draggable: false,
            modal: true,
            height: 130,
        });
        $("#invalidNum" ).dialog({
            autoOpen: false,
            draggable: false,
            modal: true,
            height: 130,
        });
        $("#win" ).dialog({
            autoOpen: false,
            draggable: false,
            modal: true,
            height: 110,
    	});
    	$("#stopGuessing" ).dialog({
            autoOpen: false,
            draggable: false,
            modal: true,
            height: 170,
    	});
	});
});













