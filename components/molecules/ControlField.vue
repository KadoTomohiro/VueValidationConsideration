<template>
  <FormControlLayout>
    <template #label>
      <FormLabel
        ><slot name="label">{{ label }}</slot></FormLabel
      >
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #error>
      <small v-if="hasValidation && validation.$error" class="error">
        <span v-for="invalid in invalidParamNames" :key="invalid"><slot :name="invalid"></slot></span>
      </small>
    </template>
  </FormControlLayout>
  <!--  <div class="control-unit"></div>-->
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { Params } from 'vuelidate/lib/validators'
import { Validation } from 'vuelidate'
import FormControlLayout from '~/components/molecules/FormControlLayout.vue'

@Component({
  name: 'ControlField',
  components: {
    FormControlLayout,
  },
})
export default class ControlFieldComponent extends Vue {
  @Prop({ type: String, required: false, default: 'text' })
  readonly type!: string

  @Prop({ type: String, required: false })
  readonly label!: string

  @Prop({ type: Object as PropType<Validation & Params>, required: false })
  validation!: Validation & Params

  @Prop({ type: Number, required: false, default: 1 })
  maxErrorShow!: number

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
.error {
  font-size: 0.7em;
  color: #ff6161;
  display: flex;
  flex-direction: column;
}
</style>
