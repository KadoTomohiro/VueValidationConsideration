<template>
  <input v-model="inputValue" :type="type" :placeholder="placeholder" @input="touch" @blur="blur" />
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

  @Prop({ type: String })
  value!: string

  get inputValue(): string {
    return this.value
  }

  set inputValue(value: string) {
    this.$emit('input', value)
  }

  @Prop({ type: String })
  placeholder!: string

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
  margin: 0.3em 0;
  padding: 0.5em;
}
</style>
