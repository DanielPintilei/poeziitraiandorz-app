<template>
  <div
    :style="{ backgroundColor: theme.background, borderColor: theme.border2 }"
    class="more">
    <div class="more__inner">
      <div class="more__item">
        <svg
          :fill="theme.icon2"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
        </svg>
        <span>by Ion Lupița</span>
      </div>
      <div class="more__item">
        <svg
          :fill="theme.icon2"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
          <path d="M0 0h24v24H0V0z" fill="none"/>
        </svg>
        <span>by Andrei Roman</span>
      </div>
      <div class="more__item">
        <svg
          :fill="theme.icon2"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
        <span>&amp;</span>
        <svg
          :fill="theme.icon2"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/>
        </svg>
        <span>by Daniel Pintilei</span>
      </div>
      <div class="more__item">
        <svg
          :fill="theme.icon2"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z"/>
        </svg>
        <span>by Netlify</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  props: ['theme'],
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="stylus">

.more
  position absolute
  top 50%
  right 50%
  bottom 50%
  left 50%
  // transform translateX(-50%) translateY(-50%) rotate(45deg)
  transform translateX(-50%) translateY(-50%)
  width 280px
  height 280px
  border 1px solid
  display flex
  align-items center
  justify-content center
  opacity 0.8
  cursor default
  z-index 20

// .more__inner
//   transform rotate(-45deg)

.more__item
  display flex
  align-items center
  & svg
    margin 7px

</style>
