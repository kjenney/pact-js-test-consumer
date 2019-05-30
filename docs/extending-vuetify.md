# Extending Vuetify components

When building custom components it may be desirable to pass vuetify component props/attributes down 
to child components. For example, a custom button component that will pass the common Vuetify prop 
"color", and common attribute "dark":

```html
<custom-button color="secondary" dark>
  Click me
</custom-button>
```

In order to pass these props and attributes down to the child component, `v-btn`, we can use the 
`v-bind` directive.

```html
<!-- CustomButton.vue -->
<template>
  <v-btn v-bind="[$props, $attrs]">
    <v-icon left dark>search</v-icon>
    <slot>Submit</slot>
  </v-btn>
</template>

<script>
import { VBtn } from 'vuetify';

export default {
  name: 'custom-button',
  props: VBtn.props
}
</script>
```

Note that in order for Vue to differentiate between props and attributes, you must define your props. 
Everything will be assumed to be a static attribute unless defined as a prop. If you only want to
pass specific props, just define them individually instead of passing `VBtn.props`.

This can be done with multiple child components to ensure that a component is themeable.
