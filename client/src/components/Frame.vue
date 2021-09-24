<template>
  <div class="frame">
    <p class="frame-index">{{ frameId }}</p>
    <div class="roll-values">
      <p class="score">
        {{ strike ? null : spare ? null : firstRoll ? firstRoll : "0" }}
      </p>
      <p class="score second-score">
        {{ strike ? "X" : spare ? "/" : secondRoll ? secondRoll : "0" }}
      </p>
    </div>
    <TotalScore
      :total="[firstRollScore, secondRollScore]"
      :frameScore="frameScore"
      :boardId="boardId"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import TotalScore from "./TotalScore.vue";
import FrameScore from "../typings/Types";

@Component({
  components: {
    TotalScore,
  },
})
export default class Frame extends Vue {
  @Prop() private frameId!: number;
  @Prop() private boardId!: number;
  @Prop() private firstRollScore!: number;
  @Prop() private secondRollScore!: number;
  @Prop() private resetFrame!: boolean;
  @Prop() private frameScore!: FrameScore;

  firstRoll = null as null | number;
  secondRoll = null as null | number;
  strike = false;
  spare = false;
  // total: number[] = [];

  @Watch("resetFrame")
  onResetFrame(value: boolean) {
    if (value) {
      this.firstRoll = null;
      this.secondRoll = null;
      // this.total = [];
      this.strike = false;
      this.spare = false;
    }
  }

  @Watch("firstRollScore")
  onFirstRollChange(value: number) {
    // this.total.push(value);
    if (!this.firstRoll) {
      if (value === 10) {
        this.strike = true;
        this.secondRoll = value;
        this.firstRoll = null;
        return;
      }

      this.firstRoll = value;
      // this.total.push(value)
    }
  }

  @Watch("secondRollScore")
  onSecondRollChange(value: number) {
    if (!this.secondRoll) {
      this.secondRoll = value;
      // this.total.push(value);

      if (this.firstRoll && this.firstRoll + value === 10) {
        this.spare = true;
        this.secondRoll = this.firstRoll + value;
        return;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.frame {
  margin: 30px;
  width: 100%;
  border: 5px solid black;
  background-color: whitesmoke;
  cursor: pointer;
  &:hover {
    filter: brightness(95%);
  }
}
.roll-values {
  display: flex;
  justify-content: center;
  height: 20%;
}
.score {
  width: 30px;
  font-size: 30px;
  padding: 0 10px;
  margin: 0;
}

.second-score {
  border-left: 1px solid grey;
  border-bottom: 1px solid grey;
}
.frame-index {
  font-size: 0.8em;
  font-weight: bold;
  color: white;
  background-color: #818bf0;
  margin: 0 0 10px 0;
  padding: 0;
  border-bottom: 1px solid black;
}
</style>
