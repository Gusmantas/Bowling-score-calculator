<template>
  <div>
    <h1>Bowling Score Calculator</h1>
    <button @click="addGameBoard()" class="new-player-btn">
      ADD NEW PLAYER
    </button>
    <div v-for="(component, i) in components" :key="i">
      <component :is="component" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import GameBoard from "../components/GameBoard.vue";

@Component({})
export default class Home extends Vue {
  components = [GameBoard];

  addGameBoard(): void {
    this.components.push(GameBoard);
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bowlby+One&display=swap");

.new-player-btn {
  width: 170px;
  background-color: #a2dd9a;
  border: 0.5px solid grey;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
  transition: 0.3s ease-in-out;
  color: black;
  font-family: "Bowlby One";
  letter-spacing: 1px;
}

.new-player-btn:hover {
  background-color: #dd9c9a;
  color: white;
}

h1 {
  font-family: "Bowlby One";
  margin: 0 0 50px 0;
  letter-spacing: 2px;
  font-size: 60px;
  border-bottom: 2px solid grey;
}
</style>