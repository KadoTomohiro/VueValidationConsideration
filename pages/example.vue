<template>
  <div>
    <label>text: <input type="text" v-model="text" /></label>
    <div class="errors" v-if="$v.text.$invalid">
      <span v-if="!$v.text.required">必須入力です</span>
      <span v-if="!$v.text.maxLength">10文字以内で入力してください</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { maxLength, required } from 'vuelidate/lib/validators'

@Component({
  name: 'example',
  validations: {
    text: {
      required,
      maxLength: maxLength(10),
    },
  },
})
export default class Example extends Vue {
  text: string = ''
}
</script>

<style scoped>
.errors {
  color: red;
}
</style>
