<template>
  <div>
    <h1>Bowling Score Calculator</h1>
    <button @click="addGameBoard()" class="new-player-btn">
      ADD NEW PLAYER
    </button>
    <div v-for="(component, i) in components" :key="i">
      <component :is="component" :boardId="i" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import GameBoard from "../components/GameBoard.vue";
import store from "../store/index";
import framesData from "../helpers/storeData";

@Component({})
export default class Home extends Vue {
  components = [GameBoard];
  componentId = 1;

  addGameBoard(): void {
    store.commit("addNewBoard", {
      frameScores: [
        {
          frameId: 0,
          score: 0,
          strikeOrSpare: "",
        },
        {
          frameId: 1,
          score: 0,
          strikeOrSpare: "",
        },
        {
          frameId: 2,
          score: 0,
          strikeOrSpare: "",
        },
        {
          frameId: 3,
          score: 0,
          strikeOrSpare: "",
        },
        {
          frameId: 4,
          score: 0,
          strikeOrSpare: "",
        },
        {
          frameId: 5,
          score: 0,
          strikeOrSpare: "",
        },
        {
          frameId: 6,
          score: 0,
          strikeOrSpare: "",
        },
        {
          frameId: 7,
          score: 0,
          strikeOrSpare: "",
        },
        {
          frameId: 8,
          score: 0,
          strikeOrSpare: "",
        },
        {
          frameId: 9,
          score: 0,
          strikeOrSpare: "",
        },
      ],
      passRound: false,
      totalScore: 0,
    });
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