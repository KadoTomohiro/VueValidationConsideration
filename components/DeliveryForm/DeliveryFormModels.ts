import { Order } from '~/models/Order'
import { NameValue } from '~/models/UtilityTypes'

export interface DeliveryForm {
  name: string
  zipcode: string
  address: string
  orders: Order[]
  soySauce: string
  options: string[]
  isRegister: boolean
  email: string
  password: string
  passwordConfirm: string
}

export type SoySauces = NameValue<string>[]
export type OptionList = NameValue<string>[]
