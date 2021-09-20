<template>
  <div class="wrapper">
    <div v-for="value of knockedPinsValue" :key="value" class="buttons">
      <button
        :disabled="pinsLeft < value ? true : false"
        @click="emitValue(value)"
        :style="{'background-color': buttonColor}"
      >
        {{ value }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Buttons extends Vue {
  @Prop() private resetButtons!: boolean;
  @Prop() private buttonColor !: string;
  knockedPinsValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as number[];
  pinsLeft = 10;
  rollCount = 0;

  lockButtons(value: string): void {
    this.pinsLeft = this.pinsLeft - parseInt(value);
    this.rollCount++;

    if (this.pinsLeft === 0 || this.rollCount === 2) {
      this.pinsLeft = 10;
      this.rollCount = 0;
    }
  }

  emitValue(value: string): void {
    this.lockButtons(value);
    this.$emit("getPinValue", value);
  }

  @Watch("resetButtons")
  onButtonReset(value: boolean) {
    if (value) {
      this.pinsLeft = 10;
      this.rollCount = 0;
    }
  }
}
</script>

<style scoped >
.wrapper {
  display: flex;
  flex-direction: row;
  align-self: center;
  margin-bottom: 10px;
}
.buttons {
  margin: 5px;
}
button {
  width: 40px;
  padding: 10px;
  border-radius: 5px;
  border: 0.5px solid grey;
  cursor: pointer;
}

button:hover {
 filter: brightness(85%)
}
</style>