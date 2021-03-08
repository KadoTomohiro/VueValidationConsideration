<template>
  <div class="container">
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
.container {
  padding: 0.5em;
  border-bottom: #a0a0a0 solid 1px;
  display: flex;
  align-items: flex-start;
}
.slot {
  display: inline-block;
}
.menu {
  width: 10em;
}
.wasabi {
  width: 4em;
}
.amount {
  width: 5em;
}
.sumTotal {
  width: 5em;
}
.remove {
  width: 3em;
}
</style>
