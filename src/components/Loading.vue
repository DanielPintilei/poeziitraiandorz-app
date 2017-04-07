<template>
  <svg width="200" height="2" viewBox="0 0 200 2">
    <line
      :stroke="color"
      class="loading"
      x1="0" y1="1" x2="200" y2="1" stroke-width="2" />
  </svg>
</template>

<script>
export default {
  name: 'loading',
  props: ['color'],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus">
.loading {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: loading 2s infinite ease-in;
}
@keyframes loading {
  to {
    stroke-dashoffset: -200;
  }
}
</style>
