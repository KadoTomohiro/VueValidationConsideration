<template>
  <div class="container">
    <form @submit.prevent="onSubmit()">
      <fieldset>
        <legend>お届け先</legend>
        <ControlField label="氏名" :validation="$v.form.name">
          <TextInput v-model="form.name" @touch="$v.form.name.$touch()"></TextInput>
          <template #required>入力必須です</template>
        </ControlField>

        <ControlField :validation="$v.form.zipcode" :max-error-show="2" @blur="$v.form.zipcode.$touch()">
          <template #label>郵便番号</template>
          <TextInput v-model="form.zipcode" @touch="$v.form.zipcode.$touch()"></TextInput>
          <template #required>必須入力です</template>
          <template #zipCode>数字7文字で入力してください</template>
        </ControlField>

        <ControlField label="住所" :validation="$v.form.address" @touch="$v.form.address.$touch()">
          <TextInput v-model="form.address" @touch="$v.form.address.$touch()"></TextInput>
          <template #required>必須入力です</template>
        </ControlField>
      </fieldset>
      <fieldset>
        <legend>ご注文</legend>
        <div class="control-unit">
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
      </fieldset>

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
          <input
            id="email"
            v-model="form.email"
            type="email"
            @input="$v.form.email.$touch()"
            @blur="$v.form.email.$touch()"
          />
          <div v-if="$v.form.email.$error" class="error">
            <span v-if="!$v.form.email.requiredIfRegister">会員登録をされる場合必須入力です</span>
            <span v-if="!$v.form.email.email">有効なメールアドレスではありません</span>
          </div>
        </div>
        <div class="control-unit">
          <label for="password">パスワード</label>
          <input id="password" v-model="form.password" type="password" />
        </div>
        <div class="control-unit">
          <label for="passwordConfirm">パスワード確認</label>
          <input id="passwordConfirm" v-model="form.passwordConfirm" type="password" />
        </div>
      </fieldset>
      <button>注文する</button>
    </form>
    <div>
      <pre>
        {{ form }}
      </pre>
      <pre>
        {{ $v }}
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { required, email, sameAs, requiredIf } from 'vuelidate/lib/validators'
import { Menu, Order, SoySauces, ToppingOptions } from '~/models/Order'
import { DeliveryForm } from '~/components/DeliveryForm/DeliveryFormModels'
import OrderInput from '~/components/DeliveryForm/OrderInput.vue'
import OrderInputHeader from '~/components/DeliveryForm/OrderInputHeader.vue'
import { zipCode, password } from '~/validators/PattenValidators'
import ControlField from '~/components/molecules/ControlField.vue'

@Component({
  name: 'DeliveryForm',
  components: { OrderInput, OrderInputHeader, ControlField },
  validations: {
    form: {
      name: { required },
      zipcode: {
        required,
        zipCode: zipCode(false),
      },
      address: { required },
      soySauce: { required },
      email: {
        requiredIfRegister: requiredIf('isRegister'),
        email,
      },
      password: {
        requiredIfRegister: requiredIf('isRegister'),
        password,
      },
      passwordConfirm: {
        requiredIfRegister: requiredIf('isRegister'),
        sameAsPassword: sameAs('password'),
      },
    },
  },
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

  get menuList(): Menu[] {
    return this.$store.state.menuList
  }

  get soySauces(): SoySauces {
    return this.$store.state.soySauces
  }

  get optionList(): ToppingOptions {
    return this.$store.state.optionList
  }

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

.control-unit {
  margin: 1em;
}
.error {
  font-size: 0.7em;
  color: #ff6161;
}
</style>
