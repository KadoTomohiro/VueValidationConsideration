<template>
  <div class="container">
    <form @submit.prevent="onSubmit()">
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
            <OrderInputHeader></OrderInputHeader>
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
      <div>合計{{ total | currency }}</div>
      <div class="control-unit">
        <label>醤油の種類</label>
        <label v-for="soySauce in soySauces" :key="soySauce.value">
          <input v-model="form.soySauce" type="radio" :value="soySauce.value" />
          {{ soySauce.name }}
        </label>
      </div>
      <div class="control-unit">
        <label>オプション</label>
        <label v-for="option in optionList" :key="option.value">
          <input v-model="form.options" type="checkbox" :value="option.value" />
          {{ option.name }}
        </label>
      </div>

      <div class="control-unit">
        <label>
          <input v-model="form.isRegister" type="checkbox" />
          会員登録する
        </label>
      </div>

      <fieldset :disabled="!form.isRegister">
        <legend>会員登録</legend>
        <div class="control-unit">
          <label for="email">メールアドレス</label>
          <input id="email" v-model="form.email" type="email" />
        </div>
        <div class="control-unit">
          <label for="password">パスワード</label>
          <input id="password" v-model="form.password" type="password" />
        </div>
        <div class="control-unit">
          <label for="passwordConfirm">パスワード確認</label>
          <input
            id="passwordConfirm"
            v-model="form.passwordConfirm"
            type="password"
          />
        </div>
      </fieldset>
      <button>注文する</button>
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
import {
  DeliveryForm,
  OptionList,
  SoySauces,
} from '~/components/DeliveryForm/DeliveryFormModels'
import OrderInput from '~/components/DeliveryForm/OrderInput.vue'
import OrderInputHeader from '~/components/DeliveryForm/OrderInputHeader.vue'

@Component({
  name: 'DeliveryForm',
  components: { OrderInput, OrderInputHeader },
})
export default class DeliveryFormComponent extends Vue {
  form: DeliveryForm = {
    name: '',
    zipcode: '',
    address: '',
    orders: [],
    soySauce: '',
    options: [],
    isRegister: false,
    email: '',
    password: '',
    passwordConfirm: '',
  }

  menuList: Menu[] = []
  soySauces: SoySauces = []
  optionList: OptionList = []

  get total() {
    return this.form.orders.reduce((sum: number, order: Order) => {
      return sum + this.sumTotal(order)
    }, 0)
  }

  addOrder() {
    this.form.orders.push({
      menu: {
        name: '',
        prise: 0,
        wasabi: false,
      },
      amount: 1,
      withoutWasabi: false,
    })
  }

  removeOrder(index: number) {
    this.form.orders.splice(index, 1)
  }

  onSubmit(): void {}

  sumTotal(order: Order): number {
    return order.menu.prise * order.amount
  }

  mounted() {
    this.menuList = [
      { name: 'マグロ', prise: 250, wasabi: true },
      { name: 'タイ', prise: 300, wasabi: true },
      { name: 'エビ', prise: 150, wasabi: true },
      { name: 'タマゴ', prise: 100, wasabi: false },
    ]
    this.soySauces = [
      { name: '特性醤油', value: 'tokusei' },
      { name: 'だし醤油', value: 'dashi' },
      { name: '刺身醤油', value: 'sashimi' },
    ]
    this.optionList = [
      { name: 'がり', value: 'gari' },
      { name: 'わさび', value: 'wasabi' },
      { name: 'わりばし', value: 'waribashi' },
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
