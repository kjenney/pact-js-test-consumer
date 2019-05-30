import '@/plugins/vuetify';
import '@/scss/styles.scss';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import Logo from '@/components/icons/Logo';
import MyButton from '@/components/MyButton';

const components = [
  Logo,
  MyButton
];

Vue.use(VeeValidate);

components.forEach((component) => {
  Vue.component(component.name, component);
});
