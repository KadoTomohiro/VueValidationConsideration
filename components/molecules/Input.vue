<template>
  <div class="control-unit">
    <label class="label"
      ><slot>{{ label }}</slot></label
    >
    <input v-model="inputValue" :type="type" :placeholder="placeholder" @input="touch" @blur="blur" />
    <small v-if="hasValidation && validation.$error" class="error">
      <span v-for="invalid in invalidParamNames" :key="invalid"><slot :name="invalid"></slot></span>
    </small>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { Params } from 'vuelidate/lib/validators'
import { Validation } from 'vuelidate'

@Component({
  name: 'CustomInput',
})
export default class InputComponent extends Vue {
  @Prop({ type: String, required: false, default: 'text' })
  readonly type!: string

  @Prop({ type: String, required: false })
  readonly label!: string

  @Prop({ type: Object as PropType<Validation & Params>, required: false })
  validation!: Validation & Params

  @Prop({ type: String })
  value!: string

  @Prop({ type: String })
  placeholder!: string

  @Prop({ type: Number, required: false, default: 1 })
  maxErrorShow!: number

  get inputValue(): string {
    return this.value
  }

  set inputValue(value: string) {
    this.$emit('input', value)
  }

  get hasValidation() {
    return this.validation !== undefined
  }

  get invalidParamNames(): string[] {
    if (!this.hasValidation) {
      console.log('no param')

      return []
    }
    const validationParamNames: string[] = Object.keys(this.validation.$params)
    const invalidParamNames =
      validationParamNames.filter((validationParamName) => !this.validation[validationParamName]) || []
    return invalidParamNames.slice(0, this.maxErrorShow)
  }

  @Emit()
  touch(event: UIEvent): UIEvent {
    return event
  }

  blur(event: UIEvent): void {
    this.touch(event)
    this.$emit('blur', event)
  }
}
</script>

<style scoped>
.control-unit {
  display: flex;
  flex-direction: column;
}
.label {
  font-size: 0.8em;
}
input {
  margin: 0.3em 0;
  padding: 0.5em;
}
.error {
  font-size: 0.7em;
  color: #ff6161;
  display: flex;
  flex-direction: column;
}
</style>
