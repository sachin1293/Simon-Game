var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
})

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}



$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnser(userClickedPattern.length - 1);

})

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}


function checkAnser(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = 0.2;
    audio.play();
}