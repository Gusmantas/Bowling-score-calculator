<template>
  <div class="colors">
    <div
      :style="{ 'background-color': colors.RED }"
      @click="setColor(colors.RED)"
    ></div>
    <div
      :style="{ 'background-color': colors.BLUE }"
      @click="setColor(colors.BLUE)"
    ></div>
    <div
      :style="{ 'background-color': colors.GREEN }"
      @click="setColor(colors.GREEN)"
    ></div>
    <div
      :style="{ 'background-color': colors.YELLOW }"
      @click="setColor(colors.YELLOW)"
    ></div>
    <div
      :style="{ 'background-color': colors.PURPLE }"
      @click="setColor(colors.PURPLE)"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class ColorPicker extends Vue {
  colors = {
    RED: "#e0c9c8",
    BLUE: "#cac8e0",
    YELLOW: "#e0dfc8",
    GREEN: "#c8e0c9",
    PURPLE: "#d8c8e0",
  };

  setColor(value: string): void {
    this.$emit("setColor", value);
  }
}
</script>

<style scoped lang="scss">
.colors {
  display: flex;
  flex-direction: row;
  margin-left: 0px;
  margin-bottom: 8px;
  div {
    border-radius: 100px;
    width: 20px;
    height: 20px;
    margin-left: 5px;
    cursor: pointer;
    border: 0.3px solid grey;
    &:hover {
      filter: brightness(90%);
    }
  }
}
</style>