<template>
  <article class="poezie">
    <div
      :style="{fontSize: defaultFontSize}"
      class="poezie__main">
      <h1>{{ titlu }}</h1>
      <pre v-for="strofa in strofe">{{ strofa }}<br></pre>
    </div>
  </article>
</template>

<script>
export default {
  name: 'poezie',
  props: ['titlu', 'strofe'],
  data () {
    return {
      defaultFontSize: '1rem'
    }
  }
  // mounted: function () {
  //   setTimeout(() => {
  //   }, 3000)
  // }
}
</script>

<style scoped lang="stylus">

.poezie
  display flex
  flex-direction column
  align-items center
  padding 40px
  overflow auto

.poezie__main
  flex-grow 1
  flex-shrink 0
  user-select auto

</style>
