<template>
  <label>
    <input v-model="selectedValue" type="radio" :checked="selected === value" :value="value" /><span class="label-text"
      ><slot></slot></span
  ></label>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Model, Prop } from 'vue-property-decorator'

@Component({
  name: 'RadioInput',
})
export default class RadioInputComponent extends Vue {
  @Prop()
  readonly value!: string

  @Model('change', { type: String })
  readonly selected!: string

  get selectedValue(): string {
    return this.selected
  }

  set selectedValue(value: string) {
    this.$emit('change', value)
  }
}
</script>

<style scoped>
label {
  display: flex;
  align-items: center;
}
.label-text {
  font-size: 0.9em;
  margin-left: 0.7rem;
}
input {
  height: 2rem;
}
</style>
