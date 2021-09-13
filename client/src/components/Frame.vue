<template>
  <div class="frame">
    <p class="frame-index">{{ frameID }}</p>
    <div class="roll-values">
      <p class="score">
        {{ firstRollValue }}
      </p>
      <p class="score second-score">
        {{ !secondRollScore ? secondRollValue : secondRollScore }}
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

  firstRollValue = "0";
  secondRollValue = "0";

  @Watch("firstRollScore")
  onFirstRollChange(value: number, oldValue: number) {
    if (value === 10 || oldValue === 10) {
      this.secondRollValue = "X";
      this.firstRollValue = "";
      return;
    }
    this.firstRollValue === "0"
      ? (this.firstRollValue = value.toString())
      : (this.firstRollValue = oldValue.toString());
  }

  @Watch("secondRollScore")
  onSecondRollChange(value: number, oldValue: number) {
    this.secondRollValue = oldValue.toString();
    if (oldValue === 10) this.secondRollValue = "X";
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
