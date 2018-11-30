<script>
  import Vue from 'vue'
  import list from './list/index'
  export default {
    name: 'panel',
    components: {
      list,
    },

    data() {
      return {
        msg: ''
      }
    }
  }

</script>



<template>
  <div class="hello">
    <list></list>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
