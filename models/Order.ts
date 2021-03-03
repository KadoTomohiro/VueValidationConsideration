export interface Menu {
  name: string
  prise: number
  wasabi: boolean
}

export interface Order {
  menu: Menu
  amount: number
  withoutWasabi: boolean
}
