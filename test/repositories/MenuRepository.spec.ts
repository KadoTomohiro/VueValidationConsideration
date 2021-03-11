import { NuxtAxiosInstance } from '@nuxtjs/axios'
import axios from 'axios'
import MenuRepository from '~/repositories/MenuRepository'

jest.mock('axios')
const mockNuxtAxios = axios as jest.Mocked<NuxtAxiosInstance>

describe('MenuRepository', () => {
  it('全件取得リクエストできること', async () => {
    const repository = new MenuRepository(mockNuxtAxios)
    mockNuxtAxios.$get = jest.fn().mockResolvedValueOnce([{ name: 'タイ', price: '500', wasabi: true }])

    expect(await repository.getAll()).toEqual([{ name: 'タイ', price: 500, wasabi: true }])
  })
})
