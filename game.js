var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;


$(document).on("keydown", function(){

    //condition for pressing a key to start the game only once
    if(!started){

        nextSequence();
        started = true;

    }

});


// for clicking on color buttons
$(".btn").on("click", function(){

    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

})


//for checking the user's answer with game pattern
function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        //Checking if this current level represents the last element of two arrays
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);

        }

    }
    else{
        
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout( function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press a Key to Restart");
        startOver();

    }

}


//for finding the next color and adding to the game pattern
function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}


//for restrating the game
function startOver(){

    started = false;
    level = 0;
    gamePattern = [];

}


// function for playing sound according to the color selected
function playSound(colour){

    var audio = new Audio("sounds/" + colour + ".mp3");

    audio.play();

}


//applying animation to color buttons when pressed
function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);


}

