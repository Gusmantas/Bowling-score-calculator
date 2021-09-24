<template>
  <div>
    <p v-if="frameScore">{{ frameScore }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import store from "../store/index";
import FrameScore from "../typings/Types";

@Component({})
export default class TotalScore extends Vue {
  @Prop() private total!: number[];
  @Prop() private frameScore!: FrameScore;
  @Prop() private boardId!: number;
  frameId = this.frameScore.frameId;

  get frameScores() {
    return store.state.gameBoards[this.boardId].frameScores;
  }

  setFrameScore(frameId: number, score: number) {
    store.commit("addToTotalFrameScore", {
      boardId: this.boardId,
      frameId,
      score,
    });
  }
  setFrameStrikeOrSpare(frameId: number, strikeOrSpare: string) {
    store.commit("setStrikeOrSpare", {
      boardId: this.boardId,
      frameId,
      strikeOrSpare,
    });
  }

  checkIfStrike(firstRoll: number) {
    this.checkForPreviousStrikes(firstRoll);
    this.setFrameStrikeOrSpare(this.frameId, "strike");
    this.setFrameScore(this.frameId, firstRoll);
  }

  checkIfRegular(firstRoll: number, secondRoll: number) {
    this.checkIfStrikesOrSpares(firstRoll, secondRoll);
    this.setFrameScore(this.frameId, firstRoll + secondRoll);
    this.frameScores.forEach((frame) => {
      frame.strikeOrSpare = "";
    });
  }
  checkIfSpare(firstRoll: number, secondRoll: number) {
    this.checkIfStrikesOrSpares(firstRoll, secondRoll);
    this.setFrameStrikeOrSpare(this.frameId, "spare");
    this.setFrameScore(this.frameId, 10);
  }

  checkForPreviousStrikes(firstRoll: number) {
    if (
      this.frameId > 0 &&
      this.frameScores[this.frameId - 1].strikeOrSpare === "strike"
    ) {
      if (
        this.frameId > 1 &&
        this.frameScores[this.frameId - 2].strikeOrSpare === "strike"
      ) {
        this.setFrameScore(this.frameId - 2, 10);
        this.setFrameStrikeOrSpare(this.frameId - 2, "");
      }
      this.setFrameScore(this.frameId - 1, firstRoll);
    }
  }

  checkIfStrikesOrSpares(firstRoll: number, secondRoll: number) {
    if (this.frameId > 0 && this.frameScores[this.frameId - 1].strikeOrSpare) {
      this.frameId > 0 &&
      this.frameScores[this.frameId - 1].strikeOrSpare === "strike"
        ? this.setFrameScore(this.frameId - 1, firstRoll + secondRoll)
        : this.setFrameScore(this.frameId - 1, firstRoll);
    }
  }

  @Watch("total")
  onTotalChange(value: number[], oldValue: number) {
    const firstRoll = value[0];
    const secondRoll = value[1];

    if ((firstRoll != null && secondRoll != null) || firstRoll === 10) {
      if (firstRoll === 10) {
        this.checkIfStrike(firstRoll);
      } else if (secondRoll != null && firstRoll + secondRoll === 10) {
        this.checkIfSpare(firstRoll, secondRoll);
      } else {
        this.checkIfRegular(firstRoll, secondRoll);
      }
      store.commit("setPassRound", { boardId: this.boardId, value: true });
    }
  }
}
</script>

<style scoped>
</style>