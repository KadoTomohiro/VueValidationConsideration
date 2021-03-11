import { Context, Inject } from '@nuxt/types/app'
import MenuRepository from '~/repositories/MenuRepository'

export interface Repositories {
  menu: MenuRepository
}

export default function (ctx: Context, inject: Inject) {
  const menu: MenuRepository = new MenuRepository(ctx.$axios)
  const repositories: Repositories = {
    menu,
  }
  inject('repositories', repositories)
}
