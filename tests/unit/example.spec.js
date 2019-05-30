import { shallowMount } from '@vue/test-utils';
import PactConsumer from '@/components/PactConsumer.vue';

describe('PactConsumer.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(PactConsumer, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
