<template>
  <div class="wrapper">
    <svg width="200" height="2" viewBox="0 0 200 2">
      <line
        :stroke="color"
        class="line"
        x1="0" y1="1" x2="200" y2="1" stroke-width="2" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'wrapper',
  props: ['color'],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus">
.wrapper
  position absolute
  top 0
  right 0
  left 0
  bottom 0
  display flex
  align-items center
  justify-content center
.line
  stroke-dasharray 200
  stroke-dashoffset 200
  animation loading 2s infinite ease-in
@keyframes loading
  to
    stroke-dashoffset -200

</style>
