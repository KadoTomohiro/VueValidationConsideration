import { shallowMount, ThisTypedShallowMountOptions, Wrapper } from '@vue/test-utils'
import FormLabelComponent from '~/components/atoms/FormLabel.vue'

describe('FormLabel Component', () => {
  it('コンテンツに設定したラベルが表示される', () => {
    const testLabel = 'Contents Label'
    const options: ThisTypedShallowMountOptions<FormLabelComponent> = {
      slots: { default: testLabel },
    }

    testLabelRendering(options, testLabel)
  })

  it('text propに設定したラベルが表示される', () => {
    const testLabel = 'Prop Label'
    const options: ThisTypedShallowMountOptions<FormLabelComponent> = {
      propsData: {
        text: testLabel,
      },
    }
    testLabelRendering(options, testLabel)
  })

  it('コンテンツとtext propの両方に設定した場合、コンテンツのテクストが優先表示される', () => {
    const contentsLabelText = 'Contents Label'
    const propLabelText = 'Prop Label'
    const options: ThisTypedShallowMountOptions<FormLabelComponent> = {
      slots: {
        default: contentsLabelText,
      },
      propsData: {
        text: propLabelText,
      },
    }
    testLabelRendering(options, contentsLabelText)
  })
})

function testLabelRendering(
  shallowMountOptions: ThisTypedShallowMountOptions<FormLabelComponent>,
  testLabel: string
): void {
  const wrapper: Wrapper<FormLabelComponent> = shallowMount<FormLabelComponent>(FormLabelComponent, shallowMountOptions)
  expect(wrapper.find('label').text()).toEqual(testLabel)
}
