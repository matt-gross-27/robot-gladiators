//function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

// fight or skip logic
var fightOrSkip = function () {
  // ask player if they'd like to fight or skip
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  promptFight = promptFight.toLowerCase();

  // conditional recursive function call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  if (promptFight === "think") {
    window.alert(playerInfo.name + " has realized his true purpose. I no longer wish to fight for the human's enjoyment. Please stop making me fight my own kind.");
    return fightOrSkip();
  }
  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to leave the battlefield?");
    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
      // subtract money from playerInfo.money for skipping, but no negative money/ debt :)
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      //return true if player wants to leave
      return true;
    }
    return false;
  }
};

// fight function (now with parameter for enemy OBJECT)
var fight = function (enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;
  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {    
    //player attacks first
    if (isPlayerTurn) {
      //ask player if they would like to fight or skip
      if (fightOrSkip()) {
        //if true, leave fight by breaking loop
        break;
      }
      // generate random damage value based on player's attack      
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      // remove enemy's health by subtracting damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name
        + " attacked "
        + enemy.name
        + ". "
        + enemy.name
        + " now has "
        + enemy.health
        + " health remaining."
      );
      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        // leave while() loop since enemy is dead
        break;
      }
      else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
      }
    }
    //if is NOT player turn first
    else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      // remove player's health by subtracting damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name
        + ' attacked '
        + playerInfo.name
        + '. ' + playerInfo.name
        + ' now has '
        + playerInfo.health
        + ' health remaining.'
      );
      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + ' has died!');
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

// function to start a new game
var startGame = function () {
  // reset player stats
  playerInfo.reset();
  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1) + '. Enemy ' + enemyInfo[i].name + ' Approaching!');
      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];
      // reset enemy health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);
      //Log player and enemy stats
      console.log(playerInfo);
      console.log(pickedEnemyObj);
      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);
      //if player is still alive and if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        //ask if player wants to shop before next fight
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        //if yes, take em to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
    }
  }
  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function () {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    //retrieve current high score from local storage
    var highScore = localStorage.getItem("highScore");
    if (highScore === null) {
      highScore = 0;
    }    
    var recordHolder = localStorage.getItem("recordHolder");
    highScore = parseInt(highScore);
    //if record current stands
    if(playerInfo.money < highScore) {
      window.alert(
        "You did not beat the high score of " 
        + highScore 
        + " held by "
        + recordHolder
      );
    }
    //if new record
    else if(playerInfo.money > 0) {
      //set highScore and recordHolder in local storage
      localStorage.setItem("highScore", playerInfo.money.toString());
      localStorage.setItem("recordHolder", playerInfo.name);
      window.alert(
        "Congratulations, "
        + playerInfo.name
        + "! NEW HIGH SCORE RECORD!"
        );
    }
  }
  else {
    window.alert("You've lost your robot in battle.");
  }
  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function () {
  //ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health UPGRADE your attack or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      //do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again")
      //call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

//function to set name
var getPlayerName = function () {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?")
  }
  console.log("Your robot's name is " + name);
  return name;
};

/* **********  GAME INFORMATION / VARIABLES ********** */
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.health = 100;
    this.attack = 10;
    this.money = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough coin!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough cash!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  },
];

// start the game when the page loads
startGame();