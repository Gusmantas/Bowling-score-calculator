<template>
  <div>
    <label>Name:</label>
    <input type="text" v-model="playerName" maxLength="10"/>
    <button class="set-name-btn" @click="setPlayerName">SET</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class PlayerName extends Vue {
  playerName = "";

  setPlayerName(): void {
    this.$emit("setPlayerName", this.playerName);
  }
}
</script>

<style scoped>
input,
label,
.set-name-btn {
  margin-left: 7px;
}
</style>