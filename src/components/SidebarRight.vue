<template>
  <aside class="sidebar-right" :style="{borderColor: theme.borderColor}">

  </aside>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'sidebar-right',
  store,
  props: ['theme'],
  methods: {
  },
  data () {
    return {
    }
  },
  computed: {
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
