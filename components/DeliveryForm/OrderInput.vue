<template>
  <div>
    <OrderListLayout>
      <template #menu>
        <select v-model="order.menu">
          <option v-for="(menu, menuIndex) in menuList" :key="menuIndex" :value="menu">
            {{ menu.name }} ({{ menu.price | currency }})
          </option>
        </select>
      </template>
      <template #wasabi>
        <label>
          <CheckboxInput v-model="order.withoutWasabi" :disabled="!order.menu.wasabi"></CheckboxInput>
        </label>
      </template>
      <template #amount>
        <ControlField :validation="$v.order.amount" :error="$v.order.amount.$invalid">
          <label><TextInput v-model="order.amount" type="number" class="order-amount" min="0"></TextInput>個</label>
          <template #required>必須</template>
          <template #min>1つ以上ご注文ください</template>
        </ControlField>
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
import { required, minValue } from 'vuelidate/lib/validators'
import OrderListLayout from '~/components/DeliveryForm/OrderListLayout.vue'
import { Menu, Order } from '~/models/Order'
@Component({
  components: {
    OrderListLayout,
  },
  validations: {
    order: {
      menu: {
        name: { required },
      },
      amount: {
        required,
        min: minValue(1),
      },
    },
  },
})
export default class OrderInput extends Vue {
  @Prop({ type: Array as PropType<Menu[]>, required: true })
  readonly menuList!: Menu[]

  @Model('change', { type: Object as PropType<Order>, required: true })
  readonly order!: Order

  @Emit()
  removeOrder(): Order {
    return this.order
  }

  subtotal(order: Order) {
    return order.menu.price * order.amount || 0
  }

  created() {
    console.log(this.menuList)
  }
}
</script>

<style scoped>
.order-amount {
  width: 4em;
}

select {
  height: 2rem;
  width: 100%;
}
</style>
