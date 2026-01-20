<script>
	import { forEachTrailingCommentRange } from "typescript";

  let player1 = "John Doe";
  let player2 = "Jane Doe";

  let bestOfNum = 3;
  let legs = [0, 0];

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
</style>
