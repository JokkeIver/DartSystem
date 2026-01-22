<script lang="ts">

// Players
let player1: string = "John Doe";
let player2: string = "Jane Doe";

// The starting player for the currect leg where player 1 starts the first leg
let legStartPlayer = 1;

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
type throwRecord = {
  throwNum1: number,
  throwNum2: number,
  throwNum3: number
};

let player1Throws: throwRecord[] = [];
let player2Throws: throwRecord[] = [];



// Saving the scores after each visit for the log
type VisitLog = | {player1Visit: number, player2Visit: number, playerTurn: 1 | 2} | { legWin: string } | { legStart: string };
let visitLog: VisitLog[] = [];

let throw1: number | null = null;
let throw2: number | null = null;
let throw3: number | null = null;

// Players last throw
let player1LastThrow: number | null = null;
let player2LastThrow: number | null = null;

// Function for calculating the multiplier
type MultiplierStrategy = (value: number) => number;

const single: MultiplierStrategy = (value) => value;
const double: MultiplierStrategy = (value) => value * 2;
const triple: MultiplierStrategy = (value) => value * 3;

// The active multiplier strategy
let multiplier: MultiplierStrategy = single;

// Function for handling last throw
function handleLastThrow() {
  if(throw1 === null || throw2 === null || throw3 === null) return;
  let totalThrow: number = throw1 + throw2 + throw3;
  switch (playerInTurn) {
    case 1:
      player1Throws = [
        ...player1Throws,
        {throwNum1: throw1, throwNum2: throw2, throwNum3: throw3}
      ];
      player1left -= totalThrow;
      player1LastThrow = totalThrow;
      visitLog = [
        ...visitLog,
        {player1Visit: player1left, player2Visit: player2left, playerTurn: playerInTurn}
      ];
      throw1 = null;
      throw2 = null;
      throw3 = null;
      break;
    case 2:
      player2Throws = [
        ...player2Throws,
        {throwNum1: throw1, throwNum2: throw2, throwNum3: throw3}
      ];
      player2left -= totalThrow;
      player2LastThrow = totalThrow;
      visitLog = [
        ...visitLog,
        {player1Visit: player1left, player2Visit: player2left, playerTurn: playerInTurn}
      ];
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
    let win = checkLegWin();
    if (!win) {
      toggleTurn();
    }
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
        visitLog = [
          ...visitLog,
          { legWin: `${player1} wins this leg! Standing: ${legs[0]} : ${legs[1]}`}
        ];
        resetGame();
        console.log("Player 1 wins leg. Standing is now: " + legs[0] + " : " + legs[1]);
        return true;
      } 
    case 2:
      if (player2left === 0) {
        legs[1]++;
        visitLog = [
          ...visitLog,
          { legWin: `${player1} wins this leg! Standing: ${legs[0]} : ${legs[1]}`}
        ];
        resetGame();
        console.log("Player 2 wins leg. Standing is now: " + legs[0] + " : " + legs[1]);
        return true;
      } 
    default:
      console.log("No player is in 0");
      return false;
  }

}

// Function for reseting the game after a leg win
function resetGame() {
  player1left = startingScore;
  player2left = startingScore;

  playerInTurn = (legStartPlayer == 1) ? 2 : 1;
  console.log("New round starting. Starting player is: " + ((playerInTurn == 1) ? player1 : player2));
  legStartPlayer = (legStartPlayer == 1) ? 2 : 1;

  visitLog = [
    ...visitLog,
    { legStart: `--- Starting Leg ${legs[0] + legs[1] + 1} ---`}
  ];
}

// Function for handling turn toggle
function toggleTurn() {
  playerInTurn = (playerInTurn === 1) ? 2 : 1;
}
</script>

<div class="header">
  <h1>New Match</h1>
</div>
<div class="mainContainer">
  <div class="matchInformationContainer">
    <!-- Players row -->
    <div class="playerNamesContainer">
      <div class="player1">
        <label>Player 1</label>
        <p class="playerName" class:turn={playerInTurn === 1}>{player1}</p>
      </div>

      <div class="player2">
        <label>Player 2</label>
        <p class="playerName" class:turn={playerInTurn === 2}>{player2}</p>
      </div>
    </div>

    <!-- Score row -->
    <div class="legScoreContainer">
      <p>Best of {bestOfNum}</p>
      <p class="legScore">{legs[0]} : {legs[1]}</p>

      <div class="roundScoreContainer">
        <div class="playerLeft">
          <label>Remaining:</label>
          <p class="roundScore" class:active={playerInTurn === 1}>{player1left}</p>
          <p class="lastThrow">Last visit: {player1LastThrow}</p>
        </div>
        <div class="playerLeft">
          <label>Remaining:</label>
          <p class="roundScore" class:active={playerInTurn === 2}>{player2left}</p>
          <p class="lastThrow">Last visit: {player2LastThrow}</p>
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
        <button class="throwNum miss" on:click={() => handleThrow(0)}>Miss</button>
        <button class="throwNum undo" class:active={throw1 === null} on:click={() => undoThrow()}>Undo Last</button>
        <button class="throwNum clear" class:active={throw1 === null} on:click={() => clearThrows()}>Clr</button>
      </div>
    </div>
  </div>
    <!-- Log for the evolution of the legs -->
    <div class="logContainer">
    <div class="logHeaderContainer">
      <h1 class="logHeader">Game log</h1>
    </div>
      {#each visitLog as visit}
        {#if 'legWin' in visit}
          <p class="legWin">{visit.legWin}</p>
        {:else if 'legStart' in visit}
          <p class="newLeg">{visit.legStart}</p>
        {:else}
          <p class="visitLog">
          <span class:active={visit.playerTurn === 1}>
            {visit.player1Visit}
          </span>
          :
          <span class:active={visit.playerTurn === 2}>
            {visit.player2Visit}
          </span>
        </p>
        {/if}
      {/each}
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

/* Styling for the main page setup */
.mainContainer {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

/* Container stacks players and score vertically */
.matchInformationContainer {
  grid-column: 1;
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

.roundScore.active {
  font-weight: bold;
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

.undo{
  grid-column: span 2;
}

.logContainer {
  text-align: center;
  grid-column: 2;
  width: 100%;
  height: 100vh;
  border: 1px solid black;
}

.logContainer h1 {
  display: inline-block;
  position: relative;
  font-size: 2em;
  margin-bottom: 10px;
}

.logContainer h1::after {
  content: "";
  display: block;
  height: 2px;
  width: 100%;
  background: black;
}

.visitLog {
  display: inline-block;
  padding: 10px;
}

/* Highlight player who threw in the log */
.visitLog .active {
  font-weight: bold;
}

/* Highlight for when leg is won */
.legWin {
  text-align: center;
  font-weight: bold;
  color: green;
  margin: 0.5rem 0;
}

.newLeg {
  text-align: center;
  font-weight: bold;
  color: blue;
  margin: 1rem 0;
}
</style>
