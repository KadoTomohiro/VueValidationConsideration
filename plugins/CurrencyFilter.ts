import Vue from 'vue'

Vue.filter('currency', (value: any, locale: string = 'ja-JP', currency: string = 'JPY'): string => {
  console.log(value)
  if (value === undefined || Number.isNaN(value)) {
    return value
  }
  return Number(value).toLocaleString(locale, {
    style: 'currency',
    currency,
  })
})
