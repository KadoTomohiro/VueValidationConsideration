<template>
  <fieldset>
    <legend>お届け先</legend>
    <ControlField label="氏名" :validation="$v.form.name">
      <TextInput v-model="address.name" @touch="$v.address.name.$touch()"></TextInput>
      <template #required>入力必須です</template>
    </ControlField>

    <ControlField :validation="$v.address.zipcode" :max-error-show="2">
      <template #label>郵便番号</template>
      <TextInput v-model="address.zipcode" @touch="$v.address.zipcode.$touch()"></TextInput>
      <template #required>必須入力です</template>
      <template #zipCode>数字7文字で入力してください</template>
    </ControlField>

    <ControlField label="住所" :validation="$v.address.address">
      <TextInput v-model="address.address" @touch="$v.address.address.$touch()"></TextInput>
      <template #required>必須入力です</template>
    </ControlField>
  </fieldset>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Component, Model, Prop } from 'vue-property-decorator'
import { required } from 'vuelidate/lib/validators'
import { DeliveryAddress } from '~/components/DeliveryForm/DeliveryFormModels'
import { zipCode } from '~/validators/PattenValidators'

@Component({
  name: 'AddressForm',
  validations: {
    address: {
      name: { required },
      zipcode: {
        required,
        zipCode: zipCode(false),
      },
      address: { required },
    },
  },
})
export default class AddressForm extends Vue {
  @Model('change', { type: Object as PropType<DeliveryAddress>, required: true })
  address!: DeliveryAddress
}
</script>
