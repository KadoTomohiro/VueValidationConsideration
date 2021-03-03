<template>
  <div>
    <span class="menu"><slot name="menu"></slot></span>
    <span class="wasabi"><slot name="wasabi"></slot></span>
    <span class="amount"><slot name="amount"></slot></span>
    <span class="sumTotal"><slot name="sumTotal"></slot></span>
    <span class="remove"><slot name="remove"></slot></span>
  </div>
</template>

<style scoped>
span {
  margin: 0.5em;
}
</style>
