<template>
  <div
    @click="goBack"
    class="landing">
    Inceput
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="stylus">

.landing
  padding 40px

</style>
