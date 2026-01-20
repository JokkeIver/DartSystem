<script>
let player1 = "John Doe";
let player2 = "Jane Doe";

let bestOfNum = 3;
let legs = [0, 0];

let player1left = 501;
let player2left = 501;


function toggleTurn() {
  let players = document.getElementsByClassName("playerName");
  players[0].classList.toggle("turn");
  players[1].classList.toggle("turn");
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
  </div>

  <!-- Input number pad -->
  <div class="inputContainer">
    <div class="multipliers">
      <button class="double">Double</button>
      <button class="triple">Triple</button>
    </div>
    <div class="throwInput">
      <button class="throwNum" value="1">1</button> 
      <button class="throwNum" value="2">2</button> 
      <button class="throwNum" value="3">3</button> 
      <button class="throwNum" value="4">4</button> 
      <button class="throwNum" value="5">5</button> 
      <button class="throwNum" value="6">6</button> 
      <button class="throwNum" value="7">7</button> 
      <button class="throwNum" value="8">8</button> 
      <button class="throwNum" value="9">9</button> 
      <button class="throwNum" value="10">10</button> 
      <button class="throwNum" value="11">11</button> 
      <button class="throwNum" value="12">12</button> 
      <button class="throwNum" value="13">13</button> 
      <button class="throwNum" value="14">14</button> 
      <button class="throwNum" value="15">15</button> 
      <button class="throwNum" value="16">16</button> 
      <button class="throwNum" value="17">17</button> 
      <button class="throwNum" value="18">18</button> 
      <button class="throwNum" value="19">19</button> 
      <button class="throwNum" value="20">20</button> 
      <button class="throwNum" value="25">25</button> 
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
</style>
