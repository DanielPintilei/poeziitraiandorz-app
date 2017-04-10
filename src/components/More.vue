<template>
  <div class="more">
    <div class="more__inner">
      ⚡ by Netlify
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus">

.more
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  display flex
  align-items center
  justify-content center

.more__inner
  z-index 20

</style>
