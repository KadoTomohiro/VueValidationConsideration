import { Context } from '@nuxt/types/app'

export default function (ctx: Context) {
  ctx.$axios.onRequest(() => {})

  ctx.$axios.onError((error) => {
    const code = error.response?.status
    if (code === 400) {
      ctx.redirect('/notFound')
    }
  })
}
