<template>
  <aside class="sidebar-left" :style="{borderColor: theme.borderColor}">
    <div class="sidebar-left-title" :style="{borderRightColor: theme.borderColor2, borderBottomColor: theme.borderColor, backgroundColor: theme.navbarColor}">
      <svg :fill="theme.iconColor" class="icon-cuprins" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      <span>Cuprins</span>
    </div>
    <div class="sidebar-left-content" :style="{backgroundColor: theme.backgroundColor2, borderColor: theme.borderColor}">
      <div v-for="caiet in poeziiRef" class="caiete">
        <span @click="handleFolderClick" class="caiet-titlu">
          <svg :fill="theme.iconColor" :class="{toggled: folderOpen}" class="icon-arrow-right" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10l5 5 5-5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          {{caiet['.key']}}
        </span>
        <div v-for="poezie in caiet['.value']">
          <router-link :to="{ name: 'Poezie', params: { ruta: poezie.titlu, strofe:poezie.strofe}}">{{poezie.titlu}}</router-link>
        </div>
      </div>
      <!-- <icon-folder :folderOpen="folderOpen"  :theme="theme"></icon-folder>
      <svg :fill="theme.iconColor" :class="{toggled: folderOpen}" class="icon-arrow-right" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10l5 5 5-5z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      <svg v-if="!folderOpen" class="icon-folder" :fill="theme.iconColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      <svg v-if="folderOpen" class="icon-folder-open" :fill="theme.iconColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>-->
    </div>
  </aside>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'sidebar-left',
  store,
  props: ['theme', 'poeziiRef'],
  data () {
    return {
      folderOpen: false
    }
  },
  computed: {
    selectedSidebarFile () {
      return store.getters.getSelectedFile
    }
  },
  methods: {
    setSelectedSidebarFile () {
      store.commit('setSelectedSidebarFile')
    },
    toggleFolder () {
      this.folderOpen = !this.folderOpen
    },
    toggleCaret () {
    },
    handleFolderClick () {
      this.setSelectedSidebarFile()
      this.toggleFolder()
    }
  }
}
</script>

<style scoped>
.sidebar-left {
  flex-shrink: 0;
  flex-basis: 280px;
  display: flex;
  flex-direction: column;
}
.sidebar-left-title {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 70px;
  padding-left: 20px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
.icon-cuprins {
}
.sidebar-left-content {
  flex-grow: 1;
  padding-right: 20px;
  border-right: 1px solid;
  overflow: auto;
}
.sidebar-left::-webkit-scrollbar {
	width: 6px;
	background-color: transparent;
}
.sidebar-left::-webkit-scrollbar-track {
	background-color: hsla(0, 0%, 50%, 0.2);
}
.sidebar-left::-webkit-scrollbar-thumb {
	background-color: hsla(0, 0%, 50%, 0.5);;
  border-radius: 4px;
}
.caiete {
}
.caiet-titlu {
}
.icon-arrow-right {
  width: 22px;
  margin-right: -7px;
  transform: rotate(-90deg);
}
.icon-arrow-right.toggled {
  transform: rotate(0deg);
}
</style>
