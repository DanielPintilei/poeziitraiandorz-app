<template>
  <article
    class="poezie">
    <div
      :style="{fontSize: defaultFontSize}"
      class="poezie__main">
      <h1>{{ titlu }}</h1>
      <pre>{{ strofe }}<br></pre>
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
}
</script>

<style scoped lang="stylus">

.poezie
  display flex
  flex-direction column
  align-items center
  padding 100px 60px
  overflow auto

.poezie__main
  flex-grow 1
  flex-shrink 0
  user-select auto

</style>
