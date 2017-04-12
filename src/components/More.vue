<template>
  <div
    :style="{ backgroundColor: theme.background, borderColor: theme.border }"
    class="more">
    <div>
      <div class="more__item">
        <svg
          :fill="theme.icon2"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        <span>by Ion Lupiţa</span>
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
  transform translateX(-50%) translateY(-50%)
  width 300px
  height 300px
  border 1px solid
  display flex
  align-items center
  justify-content center
  opacity 0.8
  cursor default
  z-index 20

.more__item
  display flex
  align-items center
  & svg
    margin 5px

</style>
