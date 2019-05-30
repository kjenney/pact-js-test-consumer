<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png">
    <pact-consumer msg="PACT Consumer Test Application" />
  </div>
</template>

<script>
// @ is an alias to /src
import PactConsumer from '@/components/PactConsumer.vue';

export default {
  name: 'home',
  components: {
    PactConsumer
  }
};
</script>
