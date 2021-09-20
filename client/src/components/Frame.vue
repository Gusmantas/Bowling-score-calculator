<template>
  <div class="frame">
    <p class="frame-index">{{ frameID }}</p>
    <div class="roll-values">
      <p class="score">
        {{ strike ? null : spare ? null : firstRoll ? firstRoll : "0" }}
      </p>
      <p class="score second-score">
        {{ strike ? "X" : spare ? "/" : secondRoll ? secondRoll : "0" }}
      </p>
    </div>
    <p v-if="!strike || !spare">{{ total }}</p>
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
  @Prop() private resetFrame!: boolean;

  firstRoll = null;
  secondRoll = null;
  strike = false;
  spare = false;
  total = 0;

  @Watch("resetFrame")
  onResetFrame(value: boolean) {
    if (value) {
      this.firstRoll = null;
      this.secondRoll = null;
      this.strike = false;
      this.spare = false;
    }
  }

  @Watch("firstRollScore")
  onFirstRollChange(value: number) {
    if (!this.firstRoll) {
      if (value === 10) {
        this.strike = true;
        this.secondRoll = value;
        this.total = value;
        this.firstRoll = null;
        return;
      }

      this.firstRoll = value;
      this.total = this.total + this.firstRoll;
    }
  }

  @Watch("secondRollScore")
  onSecondRollChange(value: number) {
    if (!this.secondRoll) {
      this.secondRoll = value;
      this.total = this.total + this.secondRoll;

      if (this.firstRoll + value === 10) {
        this.spare = true;
        this.firstRoll = null;
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
