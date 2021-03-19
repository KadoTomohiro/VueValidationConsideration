import { helpers, ValidationRule } from 'vuelidate/lib/validators'

//* *
// 値が指定された配列の全ての要素以上かを検査する
//*
export function greaterEqualThanArray(arrayName: string): ValidationRule {
  return helpers.withParams({ type: 'greaterThanBefore' }, (value: any, vm: any): boolean => {
    const array = helpers.ref(arrayName, {}, vm) as number[]
    return array.every((item) => value >= item)
  })
}
