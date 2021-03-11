import MockAdapter from 'axios-mock-adapter'
import { Context } from '@nuxt/types/app'
import { menuList } from '~/plugins/AxiosAdapter/MockData'

export default function (ctx: Context) {
  const mock = new MockAdapter(ctx.$axios, { delayResponse: 200 })

  mock.onGet('/menus').reply(200, menuList)
}
