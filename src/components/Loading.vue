<template>
  <svg width="200" height="3" viewBox="0 0 200 3">
    <line
      :stroke="color"
      class="loading"
      x1="0" y1="1.5" x2="200" y2="1.5" stroke-width="3" />
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
svg {
  width 140px
}
</style>
