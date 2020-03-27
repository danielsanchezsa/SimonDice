var header = $("h1");
var green = $(".green");
var red = $(".red");
var yellow = $(".yellow");
var blue = $(".blue");

var buttonsDict = {
  0: green,
  1: red,
  2: yellow,
  3: blue
};

var buttonsDictSound = {
  0: 'sounds/green.mp3',
  1: 'sounds/red.mp3',
  2: 'sounds/yellow.mp3',
  3: 'sounds/blue.mp3'
};


var currentLevel = 1;
var isPlaying = false;
var colors = [];
var userColors = [];
var playerTurn = false;


$(document).keypress(function() {
  if (!isPlaying) {
    isPlaying = true;
    levelGenerator();
  }
});

function levelStarted() {
for(i =0; i< colors.length; i++){
  displaycolors(i, buttonsDict[colors[i]], buttonsDictSound[colors[i]]);
}

  playerTurn = true;
}

function levelGenerator() {
  header.text("Level " + currentLevel);
  colors.push(Math.floor(Math.random() * 4));
  console.log(colors);
  currentLevel++;
  levelStarted();

}

function turnManager() {
  if (userColors.length < colors.length) {} else {
    userColors = [];
    playerTurn = false;
    levelGenerator();
  }
}

function compare() {
  var returnable = true
  for (i = 0; i < colors.length; i++) {

    if ( userColors[i] != null && (userColors[i] != colors[i])) {
      return false;
    }
  }
  return returnable;
}

function lost(){
  colors = [];
  playerTurn = false;
  userColors = [];
  isPlaying = false;
  currentLevel = 1;
  header.text('YOU LOST! Press any key');
}

green.click(function() {
  if (playerTurn) {
    userColors.push(0);
    levelDisplay(green);
    if (compare()) {
      new Audio('sounds/green.mp3').play();
      turnManager();
    } else {
      new Audio('sounds/wrong.mp3').play();
      lost();
    }
  } else {
    levelGenerator();
  }
});

red.click(function() {
  if (playerTurn) {
    levelDisplay(red);
    userColors.push(1);
    if (compare()) {
      new Audio('sounds/red.mp3').play();
      turnManager();
    } else {
      new Audio('sounds/wrong.mp3').play();
      lost();

    }
  } else {
    levelGenerator();
  }
});

yellow.click(function() {
  if (playerTurn) {
    levelDisplay(yellow);
    userColors.push(2);
    if (compare()) {
      new Audio('sounds/yellow.mp3').play();
      turnManager();
    } else {
      new Audio('sounds/wrong.mp3').play();
      lost();
    }
  } else {
    levelGenerator();
  }
});

blue.click(function() {
  if (playerTurn) {
    levelDisplay(blue);
    userColors.push(3);
    if (compare()) {
      new Audio('sounds/blue.mp3').play();
      turnManager();
    } else {
      new Audio('sounds/wrong.mp3').play();
      lost();
    }
  } else {
    levelGenerator();
  }
});

function displaycolors(o,button, sound){
  setTimeout(function(){
    new Audio(sound).play();
    levelDisplay(button);
  }, 300*(o+1));
}

function levelDisplay(ele){
  ele.addClass("pressed");
  setTimeout(function(){ele.removeClass("pressed");}, 100);
}
