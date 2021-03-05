<template>
  <div class="control-unit">
    <label class="label"
      ><slot>{{ label }}</slot></label
    >
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      @input="touch"
      @blur="blur"
    />
    <span v-if="hasValidation && validation.$error" class="error">
      <slot v-if="invalid" :name="invalid"></slot>
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { Validation } from 'vuelidate'

@Component({
  name: 'CustomInput',
})
export default class InputComponent extends Vue {
  @Prop({ type: String, required: false, default: 'text' })
  readonly type!: string

  @Prop({ type: String, required: false })
  readonly label: string

  @Prop({ type: Object as PropType<Validation>, required: false })
  validation!: Validation

  @Prop({ type: String })
  value: string

  @Prop({ type: String })
  placeholder: string

  get inputValue(): string {
    return this.value
  }

  set inputValue(value: string): void {
    this.$emit('input', value)
  }

  get hasValidation() {
    return this.validation !== undefined
  }

  get invalid(): string {
    if (!this.hasValidation) {
      return ''
    }
    const validationParamNames = Object.keys(this.validation.$params)
    return validationParamNames.find(
      (validationParamName) => !this.validation[validationParamName]
    )
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
}
</style>
