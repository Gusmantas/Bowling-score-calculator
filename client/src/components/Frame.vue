<template>
  <div class="frame">
    <p class="frame-index">{{ frameID }}</p>
    <div class="roll-values">
      <p class="score">
        {{ strike ? null : spare ? null : firstRoll }}
      </p>
      <p class="score second-score">
        {{ strike ? "X" : spare ? "/" : secondRoll }}
      </p>
    </div>
    <p>Total</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Frame extends Vue {
  @Prop() private frameID!: number;
  @Prop() private firstRollScore!: number;
  @Prop() private secondRollScore!: number;

  firstRoll = 0;
  secondRoll = 0;
  strike = false;
  spare = false;

  @Watch("firstRollScore")
  onFirstRollChange(value: number, oldValue: number) {
    // Check if strike
    if (value === 10 || oldValue === 10) {
      this.strike = true;
      this.firstRoll = null;
      return;
    }
    // set state of first roll
    this.firstRoll === 0
      ? (this.firstRoll = value)
      : (this.firstRoll = oldValue);
  }

  @Watch("secondRollScore")
  onSecondRollChange(value: number, oldValue: number) {
    // if strike - do nothing
    if (this.firstRoll === 10 || this.secondRoll === 10) return;

    // set state of second roll
    this.secondRoll === 0
      ? (this.secondRoll = value)
      : (this.secondRoll = oldValue);

    // Check if spare
    if (this.firstRoll + value === 10) {
      this.spare = true;
      this.firstRoll = null;
      return;
    }
  }
}
</script>

<style scoped>
.frame {
  margin: 30px;
  width: 100%;
  border: 5px solid black;
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
