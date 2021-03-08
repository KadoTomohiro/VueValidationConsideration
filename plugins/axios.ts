import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default function ({ $axios, redirect }: { $axios: NuxtAxiosInstance; redirect: (path: string) => void }) {
  $axios.interceptors.response.use()

  $axios.onRequest(() => {})

  $axios.onError((error) => {
    const code = error.response?.status
    if (code === 400) {
      redirect('/400')
    }
  })
}
