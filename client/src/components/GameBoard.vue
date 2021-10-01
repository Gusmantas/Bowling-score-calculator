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
        :style="{ 'background-color': primaryColor || '#e0c9c8' }"
      >
        {{ playerName }}
      </p>
      <Buttons
        @getPinValue="setScore"
        :resetButtons="resetFrame"
        :buttonColor="primaryColor || '#e0c9c8'"
      />

      <div class="frame-total">
        <p :style="{ color: primaryColor || '#e0c9c8' }">
          TOTAL: <strong>{{ totalBoardScore }}</strong>
        </p>
      </div>
    </div>
    <div class="frame-wrapper">
      <div v-for="i in 10" :key="i" class="frame" @click="setActiveFrame(i)">
        <Frame
          :frameId="i"
          :boardId="boardId"
          :firstRollScore="activeFrame === i ? firstRollScore : null"
          :secondRollScore="activeFrame === i ? secondRollScore : null"
          :thirdRollScore="i === 10 ? thirdRollScore : null"
          :resetFrame="activeFrame === i ? resetFrame : ''"
          :frameScore="frameScores[i - 1]"
          :lastFrame="i === 10 ? true : false"
          :style="[
            activeFrame === i
              ? { 'background-color': primaryColor || '#e0c9c8' }
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
import store from "../store/index";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    Frame,
    Buttons,
    ColorPicker,
    PlayerNameInput,
  },
})
export default class GameBoard extends Vue {
  @Prop() private boardId!: number;
  firstRollScore = null as null | number;
  secondRollScore = null as null | number;
  thirdRollScore = null as null | number;
  activeFrame = 1;
  resetFrame = false;
  playerName = "";
  displayName = false;
  primaryColor = "";

  get frameScores() {
    return store.state.gameBoards[this.boardId].frameScores;
  }

  get totalBoardScore() {
    // console.log(store.state.gameBoards[this.boardId].totalScore);
    return store.state.gameBoards[this.boardId].totalScore;
  }

  get passRound() {
    return store.state.gameBoards[this.boardId].passRound;
  }

  setPlayerName(value: string): void {
    this.playerName = value;
    this.displayName = true;
  }
  setActiveFrame(frameIndex: number): void {
    this.resetFrame = true;
    this.activeFrame = frameIndex;
    this.firstRollScore = null;
    this.secondRollScore = null;
    if (this.activeFrame === 10) this.thirdRollScore = null;
  }

  setScore(value: number): void {
    if (this.activeFrame != 10) {
      this.firstRollScore === null
        ? (this.firstRollScore = value)
        : (this.secondRollScore = value);
    } else {
      this.firstRollScore === null
        ? (this.firstRollScore = value)
        : this.secondRollScore === null
        ? (this.secondRollScore = value)
        : (this.thirdRollScore = value);
    }
  }

  setColorValue(value: string): void {
    this.primaryColor = value;
  }

  @Watch("passRound")
  onPassRound(value: boolean) {
    if (value === true) {
      if(this.activeFrame != 10){
        this.activeFrame++;
        this.firstRollScore = null;
        this.secondRollScore = null;
      }
    }
    store.commit("setPassRound", { boardId: this.boardId, value: false });
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
  background-color: #e3e3e3;
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

.frame-total {
  position: absolute;
  margin-left: 910px;
  width: 200px;
  height: 40px;
  p {
    text-shadow: -1px 0 grey, 0 1px grey, 2px 0 grey, 0 -1px grey;
    font-size: 1.5em;
    font-weight: bold;
    margin: 0;
    padding: 10px;
    letter-spacing: 2px;
  }
}
</style>
