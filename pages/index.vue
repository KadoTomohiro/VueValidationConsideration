<template>
  <div>
    <DeliveryForm></DeliveryForm>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { DeliveryForm } from '~/components/DeliveryForm/DeliveryFormModels'

@Component({
  name: 'index',
})
export default class IndexPage extends Vue {
  formData: DeliveryForm = {
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

  onSubmit(formResult: DeliveryForm) {
    alert('登録しました')
    console.log(formResult)
  }
}
</script>
