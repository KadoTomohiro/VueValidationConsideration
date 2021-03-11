<template>
  <div class="layout-container">
    <div class="slot menu"><slot name="menu"></slot></div>
    <div class="slot wasabi"><slot name="wasabi"></slot></div>
    <div class="slot amount"><slot name="amount"></slot></div>
    <div class="slot sumTotal"><slot name="sumTotal"></slot></div>
    <div class="slot remove"><slot name="remove"></slot></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
  name: 'OrderListLayout',
})
export default class OrderListLayout extends Vue {}
</script>

<style scoped>
.layout-container {
  padding: 0.5em;
  border-bottom: #a0a0a0 solid 1px;
  display: grid;
  grid-template-rows: 2rem;
  grid-template-columns: 15em 4em 5em 5em 3em;
}

.slot {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu {
  grid-row: 1 / 2;
  grid-column: 1/2;
}
.wasabi {
  grid-row: 1 / 2;
  grid-column: 2/3;
}
.amount {
  grid-row: 1 / 2;
  grid-column: 3/4;
}
.sumTotal {
  grid-row: 1 / 2;
  grid-column: 4/5;
}
.remove {
  grid-row: 1 / 2;
  grid-column: 5/6;
}
</style>
