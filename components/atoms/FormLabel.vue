<template>
  <label class="label" :id="id"
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
  font-size: 0.8em;
}
</style>
