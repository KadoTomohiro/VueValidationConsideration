<template>
  <div class="list-container">
    <div class="list">
      <ul>
        <li v-for="(range, index) in ranges" :key="index">
          <input v-model.number="ranges[index]" type="number" :class="{ error: $v.ranges.$each[index].$invalid }" /> -
          <template v-if="isLastIndex(index)">
            <input v-model.number="max" type="number" :class="{ error: $v.max.$invalid }" />
          </template>
          <template v-else>
            <input type="number" :value="getEnd(range, index)" disabled />
          </template>
        </li>
      </ul>
      <div>
        <button type="button" @click="add()">+</button>
        <button type="button" @click="remove()">-</button>
      </div>
    </div>
    <ul>
      <li v-for="range in ranges">{{ range }}</li>
    </ul>
    <div>
      <ul>
        <li v-for="(range, index) in rangeObject" :key="index">
          <RangeInput :range="range" :last="isLastIndexObject(index, range)"></RangeInput>
        </li>
      </ul>
      <button type="button" @click="addObject()">+</button>
      <button type="button" @click="removeObject()">-</button>
    </div>

    <ul>
      <li v-for="rangeo in rangeObject">{{ rangeo }}</li>
    </ul>
    <pre>
      {{ $v }}
    </pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { minLength, minValue, required } from 'vuelidate/lib/validators'
import { greaterThanBefore } from '~/validators/RangeValidators'
import RangeInputComponent from '~/components/RangeList/Range.vue'
import { Range } from '~/components/RangeList/Range'

@Component({
  name: 'RangeList',
  components: {
    RangeInput: RangeInputComponent,
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
      greaterThanBefore: greaterThanBefore('ranges'),
    },
  },
})
export default class RangeListComponent extends Vue {
  ranges: number[] = [0, 0, 0, 0, 0]

  rangeObject: Range[] = [
    { start: 0, end: 0 },
    { start: 0, end: 0 },
    { start: 0, end: 0 },
    { start: 0, end: 0 },
    { start: 0, end: 0 },
  ]

  max = 0

  getEnd(range: number, index: number): number {
    if (this.isLastIndex(index)) {
      return 0
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
    this.ranges.push(this.max + 1)
    this.max += 1
  }

  remove() {
    this.ranges.pop()
  }

  addObject() {
    this.rangeObject.push({ start: 0, end: 0 })
  }

  removeObject() {
    this.rangeObject.pop()
  }

  @Watch('rangeObject')
  changeRangeObject() {
    this.rangeObject = this.rangeObject.map((range, index) => {})
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
