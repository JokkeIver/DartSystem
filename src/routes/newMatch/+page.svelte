<script lang="ts">

let friendsList: string[] = ["Joakim", "Joaquin", "Joki"];
</script>
<div class="header"><p>Create New Match</p></div>

<div class="mainsection">
  <div class="gameSettings">
    <div class="header"><p>Game Settings</p></div>
  </div>
  <div class="friendList">
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
</style>
