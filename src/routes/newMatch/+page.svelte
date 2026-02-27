<script lang="ts">

let friendsList: string[] = ["Joakim", "Joaquin", "Joki"];

// Game Settings
let startScore: number;
let bestOf: number;
let doubleOut: boolean;
let doubleIn: boolean;
let diddleForTheMiddleValue: boolean;

</script>
<div class="header"><p>Create New Match</p></div>

<div class="mainsection">
  <div class="gameSettings">
    <div class="header"><p>Game Settings</p></div>
    <div class="settings">
      <section class="startScoreSec">
        <label for="startScore"> Select a start score: </label>
        <select name="startScore" bind:value={startScore}>
          <option value="501">501</option> 
          <option value="101">101</option>
          <option value="170">170</option>
          <option value="201">201</option>
          <option value="301">301</option>
        </select>
      </section>
      <section class="bestOfSec">
        <label for="bestOf"> Best of legs: </label>
        <input type="number" name="bestOf" bind:value={bestOf}/>
      </section>
      <section class="doubleOut">
        <label for="doubleOut" >Double Out</label>
        <input type="checkbox" name="doubleOut" bind:checked={doubleOut} />
      </section>
      <section class="doubleIn">
        <label for="doubleIn" >Double In</label>
        <input type="checkbox" name="doubleIn" bind:checked={doubleIn} />
      </section>
      <section class="diddleForTheMiddle">
        <label for="diddleForTheMiddle">Diddle For the middle</label>
        <input type="checkbox" name="diddleForTheMiddle" bind:checked={diddleForTheMiddleValue} />
      </section>
    </div>
    <div class="startMatch">
      <button>Start Match</button>
    </div>
  </div>
  <div class="friendList">
    <div class="friendHeader"><p>Friends</p></div>
    {#each friendsList as friend}
      <input type="radio" id={friend} name="friendList" value={friend}>
      <label for={friend}>{friend}</label>
    {/each}
  </div>
</div>
<style>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header p {
  font-size: 1.5em;
  font-weight: bold;
  position: relative;
  display: inline-block;
}

.header p::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: black;
  bottom: -4px;
  left: 0;
}

.mainsection {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.gameSettings, .friendList {
  border: 1px solid rebeccapurple;
}

.friendList .friendHeader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.friendList p {
  font-size: 1.5em;
  font-weight: bold;
  position: relative;
  display: inline-block;
}

.friendList p::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: black;
  bottom: -4px;
  left: 0;
}
</style>
