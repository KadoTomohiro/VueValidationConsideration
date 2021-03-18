<template>
  <div class="container">
    <RangeList></RangeList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import RangeListComponent from '~/components/RangeList/RangeList.vue'
@Component({
  name: 'range-setting',
  components: { RangeListComponent },
})
export default class RangeSetting extends Vue {}
</script>

<style scoped>
.container {
  display: flex;
}
</style>
