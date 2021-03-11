import MenuRepository from '~/repositories/MenuRepository'

const axiosMock = {
  $get: jest.fn(),
}
describe('MenuRepository', () => {
  it('全件取得リクエストできること', async () => {
    // @ts-ignore
    const repository = new MenuRepository(axiosMock)
    axiosMock.$get.mockResolvedValueOnce([{ name: 'タイ', price: '500', wasabi: true }])

    expect(await repository.getAll()).toEqual([{ name: 'タイ', price: 500, wasabi: true }])
  })
})
