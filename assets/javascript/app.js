
var myQuestions = [
	{
		"question": "Snow White, Walt Disney's first full length movie, came out in what year?",
		"answers": ['1943', '1937', '1962'],
		"correctAnswer": 1
	},
	{
		"question": "What is Sully's real name in Monster's Inc?",
		"answers": ['James', 'Garth', 'Wayne'],
		"correctAnswer": 0
	},
	{
		"question": "What is Andy's last name in Toy Story?",
		"answers": ['McDonald', 'Smith', 'Davis'],
		"correctAnswer": 2
	},
	{
		"question": "What was Simba originally going to be named in The Lion King?",
		"answers": ['It was always Simba', 'Kala', 'Puma'],
		"correctAnswer": 0
	},
	{
		"question": "In Moana, a pounamu stone is the ______ of Te Fiti",
		"answers": ['heart', 'soul', 'voice'],
		"correctAnswer": 0
	},
	{
		"question": "In Monster's Inc, what is Boo's real name?",
		"answers": ['Debbie', 'Barbara', 'Mary'],
		"correctAnswer": 2
	},
	{
		"question": "What neighborhood is Judy Hopps from in Zootopia?",
		"answers": ['Carrotville', 'Bunny Burrow', 'Farmland'],
		"correctAnswer": 1
	},
	{
		"question": "Mickey Mouse's real name was originally going to be _______ Mouse",
		"answers": ['Milton', 'Marvin', 'Mortimer'],
		"correctAnswer": 2
	},
	{
		"question": "What characters from Alice in Wonderland and Peter Pan were voiced by the same person?",
		"answers": ['Mad Hatter and Tinkerbell', 'Alice and Wendy', 'Chesshire cat and Peter Pan'],
		"correctAnswer": 1
	},
	{
		"question": "In Frozen, what character was originally going to be the villain?",
		"answers": ['Elsa', 'Olaf', 'Kristoff'],
		"correctAnswer": 0
	}
];

//global variables
var questions = [];
var answers = [];
var correctAnswers = 0;
var value = $("input[type='radio']:checked");

//show the questions and answer choices on the screen
function showQuestions() {
	var questionClass = $(document).find("#quiz > .question");
	var choiceList = $(document).find("#quiz > .choice-list");

	for (var i = 0; i < myQuestions.length; i++) {
		questions = myQuestions[i].question;
		questionClass.append('<div><h3>' + questions + '</h3></div>');
		for (var j = 0; j < myQuestions[i].answers.length; j++) {
			answers = myQuestions[i].answers[j];
			insertAnswers = $('<li class="answers"><input type="radio" value=' + j + ' name="radio' + i + '"/>' + answers + '</li>').appendTo(".question");
		}
	}
}

//keep track of correct answers and display once submit button has been clicked
function showResults() {
	var userAnswer = '';
	for (var i = 0; i < myQuestions.length; i++) {
		userAnswer = $('input[name="radio' + i + '"]:checked').val();
		console.log(userAnswer, myQuestions[i].correctAnswer, correctAnswers);
		if (userAnswer == myQuestions[i].correctAnswer) {
			correctAnswers++;
		}
	}
	$('#score').html(correctAnswers + ' out of ' + myQuestions.length + ' correct');
}




//buttons to click which start and end quiz
window.onload = function () {
	$("#start").click(quiz.start);
	$("#submit").click(quiz.stop);
	$("#submit").toggle();
};

var intervalId;
var clockRunning = false;

var quiz = {

	time: 60,

	start: function () {
		if (!clockRunning) {
			intervalId = setInterval(quiz.count, 1000);
			clockRunning = true;
			showQuestions();
			$('#start').remove();
			$("#submit").toggle(display);
		}
	},

	count: function () {
		quiz.time--;
		var converted = quiz.timeConverter(quiz.time);
		console.log(converted);
		$("#display").html(converted);
	},

	timeConverter: function (t) {
		var minutes = Math.floor(t / 60);
		var seconds = t - (minutes * 60);

		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		if (minutes === 0) {
			minutes = "00";
		}
		else if (minutes < 10) {
			minutes = "0" + minutes;
		}

		return minutes + ":" + seconds;
	},

	// trying to get the game to end when the timer hits zero, but couldn't figure it out
	stop: function () {
		clearInterval(intervalId);
		clockRunning = false;
		showResults();
		$('#quiz').remove();
		$('#submit').remove();
		$('#start').remove();
	},
};