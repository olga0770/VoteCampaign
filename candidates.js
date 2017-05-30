
// load json
$.getJSON("questions.json", showAllQuestions);


// Show all questions
function showAllQuestions() {
	var number = 0;
	$.getJSON("questions.json", function (data) {
		$.each(data.questions, function (key, val) {
			showQuestion(val, number);
			number++;
		});
	});
}

// Show question
function showQuestion(jsonQuestions, number) {
	// klon template
	var clone = document.querySelector("#question_template").content.cloneNode(true);

	//Set id on the template
	var an = clone.firstElementChild;
	an.id = "an" + number;

	// Set clone text content
	clone.querySelector(".data_question").textContent = jsonQuestions.question;
	clone.querySelector("#option1").innerHTML = "<input type=\"radio\" class=\"toggle\" value=\"1\">"+ jsonQuestions.option1;
	clone.querySelector("#option2").innerHTML = "<input type=\"radio\" class=\"toggle\" value=\"2\">"+ jsonQuestions.option2;
	clone.querySelector("#option3").innerHTML = "<input type=\"radio\" class=\"toggle\" value=\"3\">"+ jsonQuestions.option3;
	clone.querySelector("#option4").innerHTML = "<input type=\"radio\" class=\"toggle\" value=\"4\">"+ jsonQuestions.option4;
	clone.querySelector("#option5").innerHTML = "<input type=\"radio\" class=\"toggle\" value=\"5\">"+ jsonQuestions.option5;

	document.querySelector(".allQuestions").appendChild(clone);
}


// Calculate candidate result
function calculateResult() {
	// Declare result array
	var userResultArray = new Array(18);

	// Collect the answers
	for (i = 0; i < userResultArray.length; i++) {
		//var ans = $(".an" + i + 1 + " label.active input");
		//console.log("Val" + i + " = " + ans.val());
		var val = $('#an' + i + ' label.active input').val();
		// ask user to answer to all questions
		if(val == null){
			//alert("Angiv venligst svar for alle spørgsm&#229l");
			//return;
		}
		userResultArray[i] = val;
		//console.log("The result for " + i + " is = " + userResultArray[i]);
	}

	//console.log("load politiciansAnswers");
	var politiciansAnswers = loadPoliticiansAnswers();
	var matchResults = new Array();
	//console.log("politiciansAnswers.length= "+ politiciansAnswers.length);
	// Iterate all politicians
	for(var pIndex in politiciansAnswers){
			var polit = politiciansAnswers[pIndex];
			var points = 0.0;
			// console.log("pIndex= "+ pIndex);

			// Count number of point
			// For each same answer we will give 1 point and give ½ point if the answer is similar
			// Example: if user answers 2 and politician answers 1, then ½ point is given
			for(var userResultIndex in userResultArray){
					var politAnswerIndex = parseInt(userResultIndex)+1;
					// console.log("userResultIndex= "+ userResultIndex +"- politAnswerIndex= "+ politAnswerIndex);
					// console.log(userResultIndex +": Politiker("+polit[politAnswerIndex]+"), Bruger("+ userResultArray[userResultIndex]+") - Points("+ points +")");

					// Calculate points for current answer
					switch (userResultArray[userResultIndex]) {
					    case "1":
									// console.log("User option 1");
									if(polit[politAnswerIndex] == "1")
											points += 1;
									if(polit[politAnswerIndex] == "2")
											points += 0.5;
									break;
							case"2":
									// console.log("User option 2");
									if(polit[politAnswerIndex] == "2")
											points += 1;
									if(polit[politAnswerIndex] == "1")
											points += 0.5;
									break;
							case "3":
									// console.log("User option 3");
									if(polit[politAnswerIndex] == "3")
											points += 1;
									break;
							case "4":
									// console.log("User option 4");
									if(polit[politAnswerIndex] == "4")
											points += 1;
									if(polit[politAnswerIndex] == "5")
											points += 0.5;
							break;
							case "5":
									// console.log("User option 5");
									if(polit[politAnswerIndex] == "5")
											points += 1;
									if(polit[politAnswerIndex] == "4")
											points += 0.5;
							break;
					}
			}
			var politicianResult = [points, polit[0]];
			matchResults[pIndex] = politicianResult;
			console.log("Politician("+ polit[0] +") - points("+ points +")")
	}
	displayResults(matchResults);
}

// Display the results
function displayResults(matchResults){
	// var div = document.querySelector(".testResults");
	// div.innerHTML = "";

	// Order the list descending
	matchResults.sort(sortFunction);
	document.querySelector(".testResults").innerHTML = "";

	for(i=0; i < 5; i++){
		var percent = Math.round((matchResults[i][0]/18)*100);

		$(".testResults").append('<div class="progress">'+
		'<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="36" aria-valuemin="0" aria-valuemax="100" style="width:'+ percent +'%">'+
			'Du er '+ percent +'&#37; enig med '+ matchResults[i][1] +'</div></div>');



	}
}

// Loads the all politician answers
function loadPoliticiansAnswers(){
	// Array that holds the answers of all politicians
	var politiciansAnswers = new Array();
	var num = 0;
	$.ajaxSetup({async: false});
	$.getJSON("answers.json", function (data) {
		var node = data.politicians[0];

		var n1 = node.val;
		var n2 = node.key;

		$.each(data.politicians, function (key, val) {
			console.log("key: "+ key +" val: "+ val.name);
			// Array that holds the name and answers of a single politician
			var politicianAnswer = new Array(19);
			politicianAnswer[0] = val.name;
			politicianAnswer[1] = val.q1;
			politicianAnswer[2] = val.q2;
			politicianAnswer[3] = val.q3;
			politicianAnswer[4] = val.q4;
			politicianAnswer[5] = val.q5;
			politicianAnswer[6] = val.q6;
			politicianAnswer[7] = val.q7;
			politicianAnswer[8] = val.q8;
			politicianAnswer[9] = val.q9;
			politicianAnswer[10] = val.q10;
			politicianAnswer[11] = val.q11;
			politicianAnswer[12] = val.q12;
			politicianAnswer[13] = val.q13;
			politicianAnswer[14] = val.q14;
			politicianAnswer[15] = val.q15;
			politicianAnswer[16] = val.q16;
			politicianAnswer[17] = val.q17;
			politicianAnswer[18] = val.q17;
			// Add this politicians answers to all politicians answers
			politiciansAnswers[num] = politicianAnswer;
			num++;
		});
	});
	// console.log("returning from load");
	return politiciansAnswers;
}


// Sorting function
// source: https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}
