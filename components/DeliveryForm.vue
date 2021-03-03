<template>
  <div class="container">
    <form>
      <div class="control-unit">
        <label for="name">氏名</label>
        <input id="name" v-model="form.name" type="text" />
      </div>
      <div class="control-unit">
        <label for="zipcode">郵便番号</label>
        <input id="zipcode" v-model="form.zipcode" type="text" />
      </div>
      <div class="control-unit">
        <label for="address">住所</label>
        <input id="address" v-model="form.address" type="text" />
      </div>
      <div class="control-unit">
        <label>ご注文</label>
        <ul>
          <li>
            <OrderListLayout>
              <template #menu>商品</template>
              <template #wasabi>サビ抜き</template>
              <template #amount>個数</template>
              <template #sumTotal>小計</template>
              <template #remove>削除</template>
            </OrderListLayout>
          </li>
          <li v-for="(order, index) in form.orders" :key="index">
            <OrderInput
              v-model="form.orders[index]"
              :menu-list="menuList"
              @remove-order="removeOrder(index)"
            ></OrderInput>
          </li>
        </ul>
        <button type="button" @click="addOrder()">+</button>
      </div>
    </form>
    <pre>
      {{ form }}
    </pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Menu, Order } from '~/models/Order'

interface DeliveryForm {
  name: string
  zipcode: string
  address: string
  orders: Order[]
}

@Component({
  name: 'DeliveryForm',
})
export default class DeliveryFormComponent extends Vue {
  form: DeliveryForm = {
    name: '',
    zipcode: '',
    address: '',
    orders: [],
  }

  menuList: Menu[] = []

  addOrder() {
    this.form.orders.push({
      menu: {
        name: '',
        price: 0,
        wasabi: false,
      },
      amount: 1,
      withoutWasabi: false,
    })
  }

  removeOrder(index: number) {
    console.log(index)
    this.form.orders.splice(index, 1)
  }

  mounted() {
    this.menuList = [
      { name: 'マグロ', prise: 250, wasabi: true },
      { name: 'タイ', prise: 300, wasabi: true },
      { name: 'エビ', prise: 150, wasabi: true },
      { name: 'タマゴ', prise: 100, wasabi: false },
    ]
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

ul {
  list-style: none;
}
</style>
