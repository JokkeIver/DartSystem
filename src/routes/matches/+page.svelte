<script lang="ts">
// Players
let player1: string = "John Doe";
let player2: string = "Jane Doe";

// Player in turn
// 1 for player 1, 2 for player 2
let playerInTurn = 1;

// Setup for the number of legs and score
let bestOfNum: number = 3;
let legs: number[] = [0, 0];

// Setup for the game
let startingScore: number = 501;

let player1left: number = 501;
let player2left: number = 501;

// Saving of the players throws
let player1Throws = [];
let player2Throws = [];

let throw1: number | null = null;
let throw2: number | null = null;
let throw3: number | null = null;

// Function for calculating the multiplier
type MultiplierStrategy = (value: number) => number;

const single: MultiplierStrategy = (value) => value;
const double: MultiplierStrategy = (value) => value * 2;
const triple: MultiplierStrategy = (value) => value * 3;

// The active multiplier strategy
let multiplier: MultiplierStrategy = single;

// Function for handling last throw
function handleLastThrow() {
  let totalThrow: number = throw1 + throw2 + throw3;
  const throwRecord = {
    throw1: throw1,
    throw2: throw2,
    throw3: throw3
  }
  switch (playerInTurn) {
    case 1:
      player1Throws.push(throwRecord)
      player1left -= totalThrow;
      throw1 = null;
      throw2 = null;
      throw3 = null;
      break;
    case 2:
      player2Throws.push(throwRecord)
      player2left -= totalThrow;
      throw1 = null;
      throw2 = null;
      throw3 = null;
      break;
    default:
      console.log("Invalid Player");
  } 
}

// Function for handling throw registering
function handleThrow(registeredThrow: number) {
  if (registeredThrow === 25) {
    if (multiplier === triple) {
      return alert("Can't triple score on bull");
    }
  }
  const finalValue = multiplier(registeredThrow);

  if (throw1 === null) {
    throw1 = finalValue;
  } else if (throw2 === null) {
    throw2 = finalValue;
  } else if (throw3 === null) {
    throw3 = finalValue;
    handleLastThrow();
    checkLegWin();
    toggleTurn();
  } else {
    alert("Error 401 - Already registered 3 throws.");
  }

  multiplier = single;
}

// Function for undoing throw
function undoThrow() {
  if (throw3 != null) {
    throw3 = null;
  } else if (throw2 != null) {
    throw2 = null;
  } else if (throw1 != null) {
    throw1 = null;
  } else {
    alert("Error 401 - Can't undo without a throw registered.")
  }
}

// Function for clear all throws
function clearThrows() {
  if (throw1 != null) {
    throw1 = null;
    throw2 = null;
    throw3 = null;
  } else {
    console.log("Can't clear throws without player having thrown any shots.")
  }
}

// Function for checking for leg win
function checkLegWin() {
  switch(playerInTurn){
    case 1: 
      if (player1left === 0) {
        legs[0]++;
        resetGame();
        console.log("Player 1 wins leg. Standing is now: " + legs[0] + " : " + legs[1]);
      } 
    case 2:
      if (player2left === 0) {
        legs[1]++;
        resetGame();
        console.log("Player 2 wins leg. Standing is now: " + legs[0] + " : " + legs[1]);
      } 
    default:
  }
      
}

// Function for reseting the game after a leg win
function resetGame() {
  player1left = startingScore;
  player2left = startingScore;
}

// Function for handling turn toggle
function toggleTurn() {
  let players = document.getElementsByClassName("playerName");
  players[0].classList.toggle("turn");
  players[1].classList.toggle("turn");

  playerInTurn = (playerInTurn === 1) ? 2 : 1;
}
</script>

<div class="header">
  <h1>New Match</h1>
</div>

<div class="matchInformationContainer">
  <!-- Players row -->
  <div class="playerNamesContainer">
    <div class="player1">
      <label>Player 1</label>
      <p class="playerName turn">{player1}</p>
    </div>

    <div class="player2">
      <label>Player 2</label>
      <p class="playerName">{player2}</p>
    </div>
  </div>

  <!-- Score row -->
  <div class="legScoreContainer">
    <p>Best of {bestOfNum}</p>
    <p class="legScore">{legs[0]} : {legs[1]}</p>

    <div class="roundScoreContainer">
      <div class="playerLeft">
        <label>Remaining:</label>
        <p class="RoundScore">{player1left}</p>
      </div>
      <div class="playerLeft">
        <label>Remaining:</label>
        <p class="RoundScore">{player2left}</p>
      </div>
    </div>
    <div class="throwDisplay">
      <p class="curThrow" id="throw1">{throw1}</p>
      <p class="curThrow" id="throw2">{throw2}</p>
      <p class="curThrow" id="throw3">{throw3}</p>
    </div>
    <button on:click={() => toggleTurn()}>End Turn</button>
  </div>

  <!-- Input number pad -->
  <div class="inputContainer">
    <div class="multipliers">
      <button class="single" class:active={multiplier === single} on:click={() => multiplier = single}>Single</button>
      <button class="double" class:active={multiplier === double} on:click={() => multiplier = double}>Double</button>
      <button class="triple" class:active={multiplier === triple} on:click={() => multiplier = triple}>Triple</button>
    </div>
    <div class="throwInput">
      <button class="throwNum"  on:click={() => handleThrow(1)}>1</button> 
      <button class="throwNum" on:click={() => handleThrow(2)}>2</button> 
      <button class="throwNum" on:click={() => handleThrow(3)}>3</button> 
      <button class="throwNum" on:click={() => handleThrow(4)}>4</button> 
      <button class="throwNum" on:click={() => handleThrow(5)}>5</button> 
      <button class="throwNum" on:click={() => handleThrow(6)}>6</button> 
      <button class="throwNum" on:click={() => handleThrow(7)}>7</button> 
      <button class="throwNum" on:click={() => handleThrow(8)}>8</button> 
      <button class="throwNum" on:click={() => handleThrow(9)}>9</button> 
      <button class="throwNum" on:click={() => handleThrow(10)}>10</button> 
      <button class="throwNum" on:click={() => handleThrow(11)}>11</button> 
      <button class="throwNum" on:click={() => handleThrow(12)}>12</button> 
      <button class="throwNum" on:click={() => handleThrow(13)}>13</button> 
      <button class="throwNum" on:click={() => handleThrow(14)}>14</button> 
      <button class="throwNum" on:click={() => handleThrow(15)}>15</button> 
      <button class="throwNum" on:click={() => handleThrow(16)}>16</button> 
      <button class="throwNum" on:click={() => handleThrow(17)}>17</button> 
      <button class="throwNum" on:click={() => handleThrow(18)}>18</button> 
      <button class="throwNum" on:click={() => handleThrow(19)}>19</button> 
      <button class="throwNum" on:click={() => handleThrow(20)}>20</button> 
      <button class="throwNum bull" on:click={() => handleThrow(25)}>25</button> 
      <button class="throwNum undo" class:active={throw1 === null} on:click={() => undoThrow()}>Undo Last</button>
      <button class="throwNum clear" class:active={throw1 === null} on:click={() => clearThrows()}>Clr</button>
    </div>
  </div>

</div>

<style>
/* Header with underline */
.header {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.header h1 {
  position: relative;
}

.header h1::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background: black;
  margin-top: 4px;
}

/* Container stacks players and score vertically */
.matchInformationContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem; /* space between players row and score */
}

/* Players row side by side */
.playerNamesContainer {
  display: flex;
  flex-direction: row;
  gap: 4rem; /* space between players */
  justify-content: center;
  width: 100%;
  max-width: 500px; /* optional, constrain total width */
}

/* Individual player styling */
.player1, .player2 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Styling for player in turn */
.turn::after {
  content: "<";
  position: absolute;
  margin-left: 5px;
  font-weight: bold;
}

.turn {
  color: red;
}

/* Score row */
.legScore{
  font-size: 2rem;
  font-weight: bold;
}

/* Handle the container for standing in legs */
.legScoreContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* Handle spacing for the leg Score table */
.legScoreContainer > p:first-child {
  margin-bottom: 3px;
}

.legScoreContainer > p:last-child {
  margin-top: 3px;
}

/* Handle the container for the current round score */
.roundScoreContainer {
  display: flex;
  flex-direction: row;
  gap: 50px;
}

.playerLeft {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Handle the styling of the current visit */
.throwDisplay {
  display: flex;
  flex-direction: row;
  gap: 50px;
}

.throwDisplay p {
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5em;
}

/* Handle the styling of the input field */

/* Multiplier */
.multipliers {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  padding: 10px;
}


.multipliers button {
  opacity: 0.5;
}

.multipliers button.active {
  opacity: 1;
  border: 1px solid red;
}

.throwInput {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 3px;
  border: 1px solid black;
  border-radius: 10px;
  width: 300px;
  height: 200px;
  padding: 10px;
}

.throwInput button.active {
  opacity: 0.5;
}
.throwInput button.active:hover {
  background: none;
  outline: none;
  cursor: pointer;
}

.bull, .undo{
  grid-column: span 2;
}
</style>
