<template>
  <div class="control-unit">
    <slot name="label"></slot>
    <slot></slot>
    <slot name="error"></slot>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
.control-unit {
  display: flex;
  flex-direction: column;
}
</style>
