<template>
  <div>
    <input v-model.number="range.start" type="number" :class="{ error: startError }" /> -
    <template v-if="last">
      <input v-model.number="range.end" type="number" :class="{ error: endError }" />
    </template>
    <template v-else>
      <input type="number" :value="range.end" disabled />
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Range } from '~/components/RangeList/Range'

@Component({
  name: 'RangeInput',
})
export default class RangeInputComponent extends Vue {
  @Prop({ type: Object as PropType<Range> })
  readonly range!: Range

  @Prop({ type: Boolean })
  readonly last!: boolean

  @Prop({ type: Boolean })
  readonly startError!: boolean

  @Prop({ type: Boolean })
  readonly endError!: Boolean
}
</script>

<style scoped>
input {
  width: 5rem;
}
.error {
  background-color: #f88787;
}
</style>
