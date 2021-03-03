<template>
  <div>
    <OrderListLayout>
      <template #menu>
        <select v-model="order.menu" name="">
          <option
            v-for="(menu, menuIndex) in menuList"
            :key="menuIndex"
            :value="menu"
          >
            {{ menu.name }} ({{ menu.prise | currency }})
          </option>
        </select>
      </template>
      <template #wasabi>
        <label>
          <input
            v-model="order.withoutWasabi"
            type="checkbox"
            :disabled="!order.menu.wasabi"
          />サビ抜き</label
        >
      </template>
      <template #amount>
        <label>
          <input v-model="order.amount" type="number" class="order-amount" />個
        </label>
      </template>
      <template #sumTotal>
        <output>
          {{ subtotal(order) | currency }}
        </output>
      </template>
      <template #remove>
        <button type="button" @click="removeOrder()">-</button>
      </template>
    </OrderListLayout>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Component, Prop, Emit, Model } from 'vue-property-decorator'
import { Menu, Order } from '~/models/Order'

@Component
export default class OrderInput extends Vue {
  @Prop({ type: Array as PropType<Menu[]>, required: true })
  readonly menuList: Menu[]

  // @Prop({ type: Object as PropType<Order>, required: true })
  // readonly order: Order

  @Model('change', { type: Object as PropType<Order>, required: true })
  readonly order

  @Emit()
  removeOrder(): Order {
    return this.order
  }

  subtotal(order: Order) {
    return order.menu.prise * order.amount || 0
  }
}
</script>

<style scoped>
.order-amount {
  width: 4em;
}
</style>
