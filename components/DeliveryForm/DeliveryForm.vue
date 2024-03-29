<template>
  <div class="container">
    <form>
      <fieldset>
        <legend>お届け先</legend>
        <ControlField label="氏名" :validation="$v.form.name">
          <TextInput v-model="form.name" @touch="$v.form.name.$touch()"></TextInput>
          <template #required>入力必須です</template>
        </ControlField>

        <ControlField :validation="$v.form.zipcode" :max-error-show="2">
          <template #label>郵便番号</template>
          <TextInput v-model="form.zipcode" @touch="$v.form.zipcode.$touch()"></TextInput>
          <template #required>必須入力です</template>
          <template #zipCode>数字7文字で入力してください</template>
        </ControlField>

        <ControlField label="住所" :validation="$v.form.address">
          <TextInput v-model="form.address" @touch="$v.form.address.$touch()"></TextInput>
          <template #required>必須入力です</template>
        </ControlField>
      </fieldset>
      <fieldset>
        <legend>ご注文</legend>
        <div class="control-unit">
          <ControlField :validation="$v.form.orders" :error="$v.form.orders.$invalid">
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
            <template #required>商品を一点以上お選びください</template>
          </ControlField>

          <button type="button" @click="addOrder()">+</button>
        </div>
        <div>合計{{ total | currency }}</div>
        <ControlField label="醤油の種類" :validation="$v.form.soySauce" :error="$v.form.soySauce.$invalid">
          <template v-for="soySauce in soySauces">
            <RadioInput :key="soySauce.value" v-model="form.soySauce" :value="soySauce.value">
              {{ soySauce.name }}
            </RadioInput>
          </template>

          <template #required>醤油を一種類お選びください</template>
        </ControlField>
        <ControlField label="オプション">
          <template v-for="option in optionList">
            <CheckboxInput :key="option.value" v-model="form.options" :value="option.value">{{
              option.name
            }}</CheckboxInput>
          </template>
        </ControlField>
      </fieldset>

      <ControlField>
        <label>
          <input v-model="form.isRegister" type="checkbox" />
          会員登録する
        </label>
      </ControlField>
      <fieldset :disabled="!form.isRegister">
        <legend>会員登録</legend>
        <ControlField label="メールアドレス" :validate="$v.form.email">
          <TextInput v-model="form.email" @touch="$v.form.email.$touch()"></TextInput>
          <template #requiredIfRegister>会員登録される場合入力必須です。</template>
          <template #email>有効なメールアドレスではありません</template>
        </ControlField>
        <ControlField label="パスワード" :validation="$v.form.password">
          <TextInput v-model="form.password" type="password" @touch="$v.form.password.$touch()"></TextInput>
          <template #requiredIfRegister>会員登録される場合必須登録です</template>
          <template #password>半角英数8文字以上24文字以内で入力してください</template>
        </ControlField>
        <ControlField label="パスワード確認" :validation="$v.form.passwordConfirm">
          <TextInput
            v-model="form.passwordConfirm"
            type="password"
            @touch="$v.form.passwordConfirm.$touch()"
          ></TextInput>
          <template #requiredIfRegister>会員登録される場合必須登録で</template>
          <template #sameAsPassword>パスワードが一致しません</template>
        </ControlField>
      </fieldset>
      <button type="button" @click="submit()">注文する</button>
    </form>
    <div>
      <pre>
              {{ form }}
            </pre
      >
      <pre>
        {{ $v }}
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { required, email, sameAs, requiredIf } from 'vuelidate/lib/validators'
import Vue from 'vue'
import { Menu, Order, SoySauces, ToppingOptions } from '~/models/Order'
import { DeliveryForm } from '~/components/DeliveryForm/DeliveryFormModels'
import OrderInput from '~/components/DeliveryForm/OrderInput.vue'
import OrderInputHeader from '~/components/DeliveryForm/OrderInputHeader.vue'
import { zipCode, password } from '~/validators/PattenValidators'

@Component({
  name: 'DeliveryForm',
  components: { OrderInput, OrderInputHeader },
  validations: {
    form: {
      name: { required },
      zipcode: {
        required,
        zipCode: zipCode(false),
      },
      address: { required },
      orders: {
        required,
      },
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

  menuList: Menu[] = []

  // get menuList(): Menu[] {
  //   return this.$store.state.menuList
  // }

  async created() {
    this.menuList = await this.$repositories.menu.getAll()
    console.log(this.menuList)
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
        price: 0,
        wasabi: false,
      },
      amount: 1,
      withoutWasabi: false,
    })
  }

  removeOrder(index: number) {
    this.form.orders.splice(index, 1)
  }

  submit(): void {
    if (this.$v.$invalid) {
      alert('入力エラーがあります')
      return
    }

    this.$emit('submit', this.form)
  }

  sumTotal(order: Order): number {
    return order.menu.price * order.amount
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.control-unit {
  margin: 1em;
}
</style>
