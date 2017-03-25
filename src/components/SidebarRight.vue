<template>
  <aside class="sidebar-right" :style="{borderColor: theme.borderColor2}">
    <div class="sidebar-right-inner">
      <div
        class="sidebar-right-search"
        :style="{
          borderColor: theme.borderColor,
          backgroundColor: theme.navbarColor
        }">
        <svg :fill="theme.iconColor" class="" height="24" viewBox="0 0 24 24" width="24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        <input
          type="text"
          class="search-input"
          placeholder="Caută">
      </div>
      <div class="sidebar-right__filters">
        <!--<input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>-->

        <!--<input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>-->


      </div>
    </div>
  </aside>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'sidebar-right',
  store,
  props: ['theme'],
  methods: {
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.sidebar-right {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  border-left: 1px solid;
  overflow: hidden;
  will-change: width;
  z-index: 2;
}
.sidebar-right-inner {
  display: flex;
  flex-direction: column;
  width: 300px;
}
.sidebar-right-search {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 64px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid;
}
.search-input {
  flex-grow: 1;
  padding-left: 12px;
  align-self: stretch;
  font-size: 15px;
  color: #fff;
  background-color: transparent;
  border: none;
  outline: none;
}
</style>
