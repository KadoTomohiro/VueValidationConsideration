import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Menu } from '~/models/Order'
import { Replace } from '~/types/Utilities'

type MenuAPIResponseDiffers = {
  price: string
}

type MenuAPIResponse = Replace<Menu, MenuAPIResponseDiffers>

export default class MenuRepository {
  private readonly resourceUrl = '/menus'

  constructor(private $axios: NuxtAxiosInstance) {}

  getAll(): Promise<Menu[]> {
    return this.$axios.$get<MenuAPIResponse[]>(this.resourceUrl).then((menus) => {
      return menus.map(MenuRepository.convertMenuFromResponse)
    })
  }

  static convertMenuFromResponse(menuResponse: MenuAPIResponse): Menu {
    const differanceData = { price: Number(menuResponse.price) }
    return Object.assign(menuResponse, differanceData)
  }
}

// type KeyValue = { [key: string]: any }

// function convertType<F extends KeyValue, T extends keyof F>(data: F): T {
//   const keys = Object.keys(data)
//
//   keys.forEach((key) => {
//     const propType = typeof data[key]
//     const transformPropType = F[]
//
//   })
//
//   for (let prop of data) {
//     const propType = typeof prop
//     const transformPropType = typeof prop
//     if (propType !== 'object' && propType) {
//     }
//   }
// }
