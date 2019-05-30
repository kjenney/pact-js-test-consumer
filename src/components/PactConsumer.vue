<template>
  <div class="hello">
    <h1><b>{{ msg }}</b></h1>
  </div>
</template>

<script>
export default {
  name: 'pact-consumer',
  props: {
    msg: {
      type: String,
      default: ''
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2, h3 {
  font-weight: bold;
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
