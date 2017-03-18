<template>
  <div class="theme-picker">
    <div v-for="(theme, index) in themes" @click="setSelectedTheme(index)" :style="{backgroundColor: theme.color}" class="swatch">
      <svg v-if="index === currentThemeIndex" class="swatch-check" fill="#fff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'theme-picker',
  store,
  data () {
    return {
    }
  },
  computed: {
    themes () {
      return store.getters.getThemes
    },
    currentThemeIndex () {
      return store.getters.getCurrentThemeIndex
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
  width: 120px;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 100%;
  right: 100%;
  padding: 5px;
  background-color: #fff;
  box-shadow: 4px 2px 6px 0px hsla(0, 0%, 0%, 0.1);
  border-radius: 4px;
}
.swatch {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin: 3px;
  border-radius: 50%;
  background-color: pink;
  cursor: pointer;
}
.swatch-check {
}
</style>
