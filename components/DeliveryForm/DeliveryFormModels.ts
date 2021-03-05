import { Order } from '~/models/Order'
import { Account } from '~/models/Account'

export interface DeliveryAddress {
  name: string
  zipcode: string
  address: string
}

export interface RegisterAccount extends Account {
  passwordConfirm: string
}

export interface DeliveryForm extends DeliveryAddress, RegisterAccount {
  orders: Order[]
  soySauce: string
  options: string[]
  isRegister: boolean
}
