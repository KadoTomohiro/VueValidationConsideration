<template>
  <OrderListLayout>
    <template #menu>商品</template>
    <template #wasabi>サビ抜き</template>
    <template #amount>個数</template>
    <template #sumTotal>小計</template>
    <template #remove>削除</template>
  </OrderListLayout>
</template>

<script type="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import OrderListLayout from "@/components/DeliveryForm/OrderListLayout";

@Component({
  components: {
    OrderListLayout,
  },
})
export default class OrderInput extends Vue {}
</script>
