<template>
  <div>
    <select v-model="date.year">
      <option v-for="(year, index) in yearOptions" :key="index" :value="year.value">{{ year.label }}</option>
    </select>
    <select v-model="date.month">
      <option v-for="(month, index) in monthOptions" :key="index" :value="month.value">
        {{ month.label }}
      </option>
    </select>
    <select v-model="date.day">
      <option v-for="(day, index) in dayOptions" :key="index" :value="day.value">{{ day.label }}</option>
    </select>

    {{ date }}
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type Option = { label: string; value: string }
type StringData = { year: string; month: string; day: string }
export default Vue.extend({
  name: 'DateSelect',
  model: {
    prop: 'date',
    event: 'change',
  },
  props: {
    date: { type: Object as PropType<StringData>, required: true },
  },
  data() {
    return {
      years: ['2021', '2022'],
      months: ['1', '2', '3'],
      days: ['1', '2', '3', '4', '5'],
    }
  },
  computed: {
    yearOptions(): Option[] {
      return this.years.map((year) => ({
        label: year,
        value: year,
      }))
    },
    monthOptions(): Option[] {
      return this.months.map((month) => ({
        label: month,
        value: month.padStart(2, '0'),
      }))
    },
    dayOptions(): Option[] {
      return this.days.map((day) => ({
        label: day,
        value: day.padStart(2, '0'),
      }))
    },
  },
})
</script>
