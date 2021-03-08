<template>
  <label>
    <input v-model="selectedValue" type="checkbox" :checked="checked" :value="value" /><span class="label-text"
      ><slot></slot></span
  ></label>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Model, Prop } from 'vue-property-decorator'

type CheckboxModelType = boolean | any[]

@Component({
  name: 'CheckboxInput',
})
export default class CheckboxInputComponent extends Vue {
  @Prop()
  readonly value!: string

  @Model('change', { type: [Boolean, Array] })
  readonly selected!: CheckboxModelType

  get selectedValue(): CheckboxModelType {
    return this.selected
  }

  set selectedValue(value: CheckboxModelType) {
    this.$emit('change', value)
  }

  get checked(): boolean {
    if (Array.isArray(this.selected)) {
      return this.selected.includes(this.value)
    } else {
      return this.selected
    }
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
