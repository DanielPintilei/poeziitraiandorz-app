<template>
  <form v-on:submit.prevent="onSubmit" class="search">
    <input type="text" v-model="search" placeholder="Caută" />
    <button type="submit">Caută</button>
  </form>
</template>

<script>

export default {
  name: 'search',
  methods: {
    onSubmit (event) {
      if (this.search && this.search !== '') {
      }
    }
  },
  data () {
    return {
      search: '456 search'
    }
  }
}
</script>

<style scoped>

</style>
