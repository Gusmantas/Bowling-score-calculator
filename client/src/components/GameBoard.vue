<template>
  <div class="board">
    <div class="player-input">
      <span v-if="!displayName">
        <ColorPicker @setColor="setColorValue" />
        <PlayerNameInput @setPlayerName="setPlayerName" />
      </span>
      <p
        v-if="displayName"
        class="player-name"
        @click="displayName = false"
        :style="{ 'background-color': boardColor || '#e0c9c8' }"
      >
        {{ playerName }}
      </p>
      <Buttons @getPinValue="setScore" :resetButtons="resetFrame" />
    </div>
    <div class="frame-wrapper">
      <div v-for="i in 10" :key="i" class="frame" @click="setActiveFrame(i)">
        <Frame
          :frameID="i"
          :firstRollScore="activeFrame === i ? firstRollScore : 0"
          :secondRollScore="activeFrame === i ? secondRollScore : 0"
          :resetFrame="activeFrame === i ? resetFrame : ''"
          :style="[
            activeFrame === i
              ? { 'background-color': boardColor || '#e0c9c8' }
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
import ColorPicker from "../components/ColorPicker.vue";
import PlayerNameInput from "./PlayerNameInput.vue";

@Component({
  components: {
    Frame,
    Buttons,
    ColorPicker,
    PlayerNameInput,
  },
})
export default class GameBoard extends Vue {
  firstRollScore = 0;
  secondRollScore = 0;
  activeFrame = 1;
  resetFrame = false;
  playerName = "";
  displayName = false;
  boardColor = "";

  setPlayerName(value: string): void {
    this.playerName = value;
    this.displayName = true;
  }
  setActiveFrame(frameIndex: number): void {
    this.resetFrame = true;
    this.activeFrame = frameIndex;
    this.firstRollScore = 0;
    this.secondRollScore = 0;
  }

  setScore(value: number): void {
    this.passRound();
    if (value === 10) this.firstRollScore = value;

    this.firstRollScore === 0
      ? (this.firstRollScore = value)
      : (this.secondRollScore = value);

    this.resetFrame = false;
  }

  setColorValue(value: string): void {
    this.boardColor = value;
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

<style scoped lang="scss">
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

.player-input {
  display: flex;
  justify-content: center;
}

span,
.player-name {
  position: absolute;
  height: 20px;
}

span {
  display: inline;
  margin-top: -3px;
  margin-right: 1000px;
}

.player-name {
  cursor: pointer;
  border: 1px solid grey;
  padding: 2px 8px;
  margin-top: 10px;
  border-radius: 100px;
  margin-right: 1200px;
  &:hover {
    filter: brightness(90%);
  }
}
.frame {
  margin: 5px 10px 0 0;
}
</style>
