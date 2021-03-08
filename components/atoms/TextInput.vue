<template>
  <input v-model="inputValue" :type="type" @input="touch" @blur="blur" />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'

@Component({
  name: 'TextInput',
})
export default class TextInputComponent extends Vue {
  @Prop({ type: String, required: false, default: 'text' })
  readonly type!: string

  @Prop({ type: [String, Number] })
  value!: string | number

  get inputValue(): string | number {
    return this.value
  }

  set inputValue(value: string | number) {
    this.$emit('input', value)
  }

  @Emit()
  touch(event: UIEvent): UIEvent {
    return event
  }

  blur(event: UIEvent): void {
    this.touch(event)
    this.$emit('blur', event)
  }
}
</script>

<style scoped>
input {
  padding: 0 0.5rem;
  height: 2rem;
}
</style>
