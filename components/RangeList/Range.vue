<template>
  <div>
    <input v-model.number="innerStart" type="number" />
    -
    <input v-model.number="innerEnd" type="number" :disabled="!last" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'RangeInput',
  props: {
    start: { type: [Number, String], required: true },
    end: { type: [Number, String], required: true },
    last: { type: Boolean, required: false, default: false },
  },
  computed: {
    innerStart: {
      get(): number {
        return this.start
      },
      set(value: number) {
        this.$emit('update:start', value)
      },
    },
    innerEnd: {
      get(): number {
        return this.end
      },
      set(value: number) {
        this.$emit('update:end', value)
      },
    },
  },
})
</script>

<style scoped>
input {
  width: 5rem;
}
.error {
  background-color: #f88787;
}
</style>
