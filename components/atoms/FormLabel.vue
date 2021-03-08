<template>
  <label :id="id" class="label"
    ><slot>{{ text }}</slot></label
  >
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'FormLabel',
})
export default class FormLabelComponent extends Vue {
  @Prop({ type: String, required: false })
  readonly text!: string

  @Prop({ type: String, required: false })
  readonly id!: string
}
</script>

<style scoped>
.label {
  display: inline-block;
  font-size: 0.8em;
  height: auto;
}
</style>
