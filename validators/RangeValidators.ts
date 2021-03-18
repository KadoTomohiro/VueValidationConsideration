import { helpers, ValidationRule } from 'vuelidate/lib/validators'

export function greaterThanBefore(parentArrayName: string): ValidationRule {
  return helpers.withParams({ type: 'greaterThanBefore' }, (value: any, vm: any): boolean => {
    const parentArray = helpers.ref(parentArrayName, this, vm) as number[]
    console.log(vm)
    console.log(parentArrayName)
    console.log(parentArray)
    return true
  })
}
