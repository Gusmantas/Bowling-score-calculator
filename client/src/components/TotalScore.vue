<template>
  <div>
    <p v-if="frameScore">{{ frameScore.score }}</p>
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
    if (
      this.frameId > 0 &&
      this.frameScores[this.frameId - 1].strikeOrSpare === "spare"
    ) {
      this.setFrameScore(this.frameId - 1, firstRoll);
      this.setFrameStrikeOrSpare(this.frameId - 1, "");
    }
  }

  checkIfStrikesOrSpares(firstRoll: number, secondRoll: number) {
    if (this.frameId > 0 && this.frameScores[this.frameId - 1].strikeOrSpare) {
      if (
        this.frameId > 1 &&
        this.frameScores[this.frameId - 2].strikeOrSpare === "strike"
      ) {
        this.setFrameScore(this.frameId - 2, firstRoll);
        this.setFrameStrikeOrSpare(this.frameId - 2, "");
      }
      this.frameId > 0 &&
      this.frameScores[this.frameId - 1].strikeOrSpare === "strike"
        ? this.setFrameScore(this.frameId - 1, firstRoll + secondRoll)
        : this.setFrameScore(this.frameId - 1, firstRoll);
    }
  }

  calculateTotal() {
    let total = 0;
    for (let frame of this.frameScores) {
      total += frame.score;
    }
    store.commit("setTotalScore", { boardId: this.boardId, total });
  }

  @Watch("total")
  onTotalChange(value: number[]) {
    const firstRoll = value[0];
    const secondRoll = value[1];

    if (value[2] != null) {
      let thirdRoll = value[2];
      if (
        firstRoll === 10 ||
        (firstRoll != null && firstRoll + secondRoll === 10)
      ) {
        store.commit("setFrameScore", {
          boardId: this.boardId,
          frameId: this.frameId,
          total: firstRoll + secondRoll + thirdRoll,
        });
      } else {
        store.commit("setFrameScore", {
          boardId: this.boardId,
          frameId: this.frameId,
          total: firstRoll + secondRoll,
        });
      }
    } else if ((firstRoll != null && secondRoll != null) || firstRoll === 10) {
      if (value[2] != null) return;
      if (firstRoll === 10) {
        this.checkIfStrike(firstRoll);
      } else if (secondRoll != null && firstRoll + secondRoll === 10) {
        this.checkIfSpare(firstRoll, secondRoll);
      } else {
        this.checkIfRegular(firstRoll, secondRoll);
      }

      store.commit("setPassRound", { boardId: this.boardId, value: true });
    }
    this.calculateTotal();
  }
}
</script>

<style scoped>
</style>