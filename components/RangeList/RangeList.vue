<template>
  <div class="list-container">
    <div>
      <ul>
        <li v-for="(range, index) in ranges" :key="index">
          <RangeInput v-if="isLastIndex(index)" :start.sync="ranges[index]" :end.sync="max" :last="true"></RangeInput>
          <RangeInput v-else :start.sync="ranges[index]" :end="getEnd(range, index)" :last="false"></RangeInput>
        </li>
      </ul>
      <button type="button" @click="add()">+</button>
      <button type="button" @click="remove()">-</button>
    </div>
    <div>
      <ul>
        <li v-for="(range, index) in ranges" :key="index">{{ range }}</li>
      </ul>
      {{ max }}
    </div>
    <ul>
      <li v-for="range in rangeObject">{{ range }}</li>
    </ul>
    <pre>
          {{ $v }}
    </pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { minLength, minValue, required } from 'vuelidate/lib/validators'
import RangeInputComponent from '~/components/RangeList/Range.vue'
import { Range } from '~/components/RangeList/Range'
import DateSelect from '~/components/molecules/DateSelect.vue'
import { greaterEqualThanArray } from '~/validators/RangeValidators'

@Component({
  name: 'RangeList',
  components: {
    RangeInput: RangeInputComponent,
    DateSelect,
  },
  validations: {
    ranges: {
      required,
      minLength: minLength(1),
      $each: {
        required,
        min: minValue(0),
      },
    },
    max: {
      required,
      min: minValue(0),
      greaterThanRange: greaterEqualThanArray('ranges'),
    },
  },
})
export default class RangeListComponent extends Vue {
  ranges: number[] = [10, 20, 0, 0, 0]

  max = 0

  get rangeObject(): Range[] {
    return this.ranges.map((range, index) => ({ start: range, end: this.getEnd(range, index) }))
  }

  getEnd(range: number, index: number): number {
    if (this.isLastIndex(index)) {
      return this.max
    }
    const nextValue = this.ranges[index + 1]

    return nextValue > range ? nextValue - 1 : range
  }

  isLastIndex(index: number): boolean {
    return this.ranges.length - 1 === index
  }

  isLastIndexObject(index: number, range): boolean {
    return this.rangeObject.length - 1 === index
  }

  add() {
    this.ranges.push(0)
  }

  remove() {
    this.ranges.pop()
  }
}
</script>

<style scoped>
.list-container {
  display: flex;
}
input {
  width: 5rem;
}

.error {
  background-color: #f88787;
}
</style>
