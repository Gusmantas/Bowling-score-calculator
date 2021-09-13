<template>
  <div class="wrapper">
    <div v-for="value of knockedPinsValue" :key="value" class="buttons">
      <button @click="emitValue(value)">{{ value }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Buttons extends Vue {
  knockedPinsValue = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ] as number[];

  emitValue(value: string): void {
    this.$emit("getPinValue", value);
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
  border: none;
  background-color: rgba(182, 229, 182, 0.616);
  cursor: pointer;
}

button:hover{
  background-color: rgb(182, 229, 182);
}
</style>