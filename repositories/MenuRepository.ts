import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Menu } from '~/models/Order'

type MenuAPIResponseDiffers = {
  price: string
}

type Trans<B, D> = Exclude<B, D> & D

export type MenuAPIResponse = Trans<Menu, MenuAPIResponseDiffers>

export default class MenuRepository {
  private readonly resourceUrl = '/menus'

  constructor(private $axios: NuxtAxiosInstance) {}

  getAll(): Promise<Menu[]> {
    return this.$axios.$get<MenuAPIResponse[]>(this.resourceUrl).then((menus) => {
      return menus.map((menu: MenuAPIResponse) => {
        const differanceData = { price: Number(menu.price) }
        return Object.assign(menu, differanceData)
      })
    })
  }
}
