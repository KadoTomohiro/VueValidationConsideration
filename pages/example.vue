<template>
  <div>
    <label>text: <input v-model="text" type="text" @input="$v.text.$touch()" /></label>
    <div v-if="$v.text.$invalid" class="errors">
      <span v-if="!$v.text.required">必須入力です</span>
      <span v-if="!$v.text.maxLength">10文字以内で入力してください</span>
    </div>

    <pre>
       {{ $v }}
     </pre
    >
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
    user: {
      name: {
        required,
      },
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
