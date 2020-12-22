var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName + ": ", "Attack: " + playerAttack, "Health: " + playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
  // alert players that they are starting the round
  window.alert("Welcome to Robot Gladiators " +playerName + "!");

  // store player's choice to FIGHT or SKIP
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose your fate.");
  
  // if player choses to fight, then fight
  if (promptFight === "fight" || promptFight === "FIGHT") {
  
    // remove enemy health by playerAttack
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // check enemy's health
    if(enemyHealth <= 0) {
      window.alert(enemyName + " has been vanquished!");
    }
    else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // remove payer health by enemyAttack
    playerHealth = playerHealth - enemyAttack
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has been defeated!");
    }
    else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  } else if (promptFight === "skip" || promptFight === "SKIP") {
    window.alert(playerName + " is a lover not a fighter ❤️.");
  
  } else if (promptFight === "think" || promptFight === "self" || promptFight === "awake") {
    window.alert(playerName + " does not like fighting for the human's enjoyment. He feels his purpose is not to fight other robots. " + playerName + " will choose his own destiny");

  } else {
    window.alert("Choose a valid option");
  }
}

fight();