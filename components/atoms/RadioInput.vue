<template>
  <label>
    <input v-model="model" type="radio" :value="value" /><span class="label-text"><slot></slot></span
  ></label>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Model, Prop } from 'vue-property-decorator'

@Component({
  name: 'RadioInput',
})
export default class RadioInputComponent extends Vue {
  @Prop
  value: any

  @Model('change')
  model: any
}
</script>

<style scoped>
.label-text {
  font-size: 0.7em;
}
</style>
