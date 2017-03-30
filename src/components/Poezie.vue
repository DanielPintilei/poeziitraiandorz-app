<template>
  <article
    class="poezie">
    <div
      :style="{fontSize: defaultFontSize}"
      class="poezie__main">
      <h1 class="poezie__titlu">{{ titlu }}</h1>
      <pre class="poezie__strofe">{{ strofe }}<br></pre>
    </div>
  </article>
</template>

<script>
export default {
  name: 'poezie',
  props: ['nr', 'titlu', 'strofe', 'caieteRef'],
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
  padding 50px 30px
  overflow auto
  @media (min-width 900px)
    padding 100px 60px

.poezie__main
  flex-grow 1
  flex-shrink 0
  user-select auto

.poezie__titlu
  max-width: 600px
  margin 0 0 1em
  font-family 'Playfair Display', serif
  font-size 1.9em
  font-weight normal
  line-height: 1.3;
  @media (min-width 900px)
    margin 0 0 2em

.poezie__strofe
  margin 0 0 1.6em
  font-family 'Libre Baskerville', serif
  font-size 1em
  line-height: 1.45
  white-space pre-wrap
  @media (min-width 900px)
    columns 2
    column-gap 3em

</style>
