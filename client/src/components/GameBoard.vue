<template>
  <div class="board">
    <Buttons @getPinValue="setScore" />
    <div class="frame-wrapper">
      <div v-for="i in 10" :key="i" class="frame">
        <Frame
          :frameID="i"
          :firstRollScore="activeFrame === i ? firstRollScore : 0"
          :secondRollScore="activeFrame === i ? secondRollScore : 0"
          :style="[
            activeFrame === i
              ? { 'background-color': '#e0c9c8' }
              : { 'background-color': '' },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Frame from "../components/Frame.vue";
import Buttons from "../components/Buttons.vue";

@Component({
  components: {
    Frame,
    Buttons,
  },
})
export default class GameBoard extends Vue {
  firstRollScore = 0;
  secondRollScore = 0;
  activeFrame = 1;

  setActiveFrame(frameIndex: number): void {
    console.log(frameIndex);
  }

  setScore(value: number): void {
    this.passRound();
    if (value === 10) this.firstRollScore = value;

    this.firstRollScore === 0
      ? (this.firstRollScore = value)
      : (this.secondRollScore = value);
  }

  passRound(): void {
    if (this.firstRollScore && this.secondRollScore) {
      this.activeFrame++;
      this.firstRollScore = 0;
      this.secondRollScore = 0;
    }
  }
}
</script>

<style scoped>
.frame-wrapper {
  display: flex;
  flex-direction: row;
  align-self: center;
}

.board {
  margin: 30px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-self: center;
  border: 1px solid grey;
  border-radius: 5px;
  width: 70%;
  padding: 10px;
  background-color: #e3e3e367;
}

.frame {
  margin: 0 5px;
}
</style>
