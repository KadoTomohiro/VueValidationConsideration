import { helpers, ValidationRule } from 'vuelidate/lib/validators'

export function patternMatch(
  pattern: RegExp,
  patternName: string = 'pattern'
): ValidationRule {
  return helpers.regex(patternName, pattern)
}
export function zipCode(hyphen: boolean): ValidationRule {
  const zipCodePattern = new RegExp(`[0-9]{3}${hyphen ? '-' : ''}[0-9]{4}`)
  return patternMatch(zipCodePattern, 'zipCode')
}

export function password(): ValidationRule {
  const passwordPattern = /^[a-zA-Z0-9.?/-]{8,24}$/
  return patternMatch(passwordPattern, 'password')
}
