var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

//detect first keypress

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//check answer

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("succes")

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong")
    //game over sound

    playSound("wrong");
    //red body for game over
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    //change h1
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //new game if wrong
    startOver();
  }

}

function nextSequence() {
  //reset user pattern
  userClickedPattern = [];
  //add level to h1
  level++;
  $("#level-title").text("Level " + level);

  //random number
  var randomNumber = Math.floor(Math.random() * 4);
  //random colour by number generated
  var randomChosenColour = buttonColours[randomNumber];
  //add colour to game pattern
  gamePattern.push(randomChosenColour);
  //animate button with the colour chosen
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //play sound for specific button
  playSound(randomChosenColour);

};



$(".btn").on("click", function() {
  //find id of button pressed
  var userChosenColour = $(this).attr("id");
  //add colour to the click pattern
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});
//play sound function - schose name by button colour
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//animate function
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};
