<template>
  <div class="theme-picker">
    <div v-for="(theme, index) in themes" @click="setSelectedTheme(index)" :style="{backgroundColor: theme.backgroundColor}" class="swatch">
      <div class="swatch-inner" :style="{backgroundColor: theme.themeColor}">
        <svg v-if="index === currentTheme" fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'theme-picker',
  store,
  props: ['themes'],
  data () {
    return {
    }
  },
  computed: {
    currentTheme () {
      return store.getters.getCurrentTheme
    }
  },
  methods: {
    setSelectedTheme (n) {
      store.commit('setSelectedTheme', n)
    }
  }
}
</script>

<style scoped>
.theme-picker {
  display: flex;
  flex-wrap: wrap;
  width: 148px;
  position: absolute;
  top: 100%;
  right: 100%;
  padding: 5px;
  background-color: #fff;
  box-shadow: 4px 2px 6px 0px hsla(0, 0%, 0%, 0.1);
  border-radius: 4px;
  z-index: 1;
}
.swatch {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 3px;
  border-radius: 50%;
  border: 1px solid hsla(0, 0%, 0%, 0.1);
  cursor: pointer;
}
.swatch-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
