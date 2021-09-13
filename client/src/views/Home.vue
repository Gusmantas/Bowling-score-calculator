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
  width: 80px;
  background-color: #e0c9c8;
  border: 2px solid grey;
  border-radius: 5px;
}

.new-player-btn:hover {
  background-color: #dd9c9a;
}

h1 {
  font-family: "Bowlby One";
  margin: 0 0 60px 0;
  letter-spacing: 2px;
  font-size: 60px;
}
</style>