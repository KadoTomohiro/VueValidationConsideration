import Vue from 'vue'

import FormLabelComponent from '~/components/atoms/FormLabel.vue'
import TextInputComponent from '~/components/atoms/TextInput.vue'
import ControlFieldComponent from '~/components/molecules/ControlField.vue'
import RadioInputComponent from '~/components/atoms/RadioInput.vue'
import CheckboxInputComponent from '~/components/atoms/CheckboxInput.vue'

Vue.component('FormLabel', FormLabelComponent)
Vue.component('TextInput', TextInputComponent)
Vue.component('RadioInput', RadioInputComponent)
Vue.component('CheckboxInput', CheckboxInputComponent)
Vue.component('ControlField', ControlFieldComponent)
