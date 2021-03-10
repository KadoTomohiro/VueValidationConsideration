import { NameValue } from '~/models/UtilityTypes'

export interface Menu {
  name: string
  price: number
  wasabi: boolean
}

export interface Order {
  menu: Menu
  amount: number
  withoutWasabi: boolean
}

export type SoySauce = NameValue<string>[]
export type ToppingOption = NameValue<string>[]
export type SoySauces = SoySauce[]
export type ToppingOptions = ToppingOption[]
