<template>
  <aside class="sidebar-right" :style="{borderColor: currentTheme.borderColor}">

  </aside>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'sidebar-right',
  store,
  methods: {
  },
  data () {
    return {
    }
  },
  computed: {
    currentTheme () {
      return store.getters.getCurrentTheme
    }
  }
}
</script>

<style scoped>
.sidebar-right {
  flex-shrink: 0;
  flex-basis: 300px;
  border-left: 1px solid;
}
</style>
