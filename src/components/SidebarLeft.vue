<template>
  <aside class="sidebar-left" :style="{borderColor: theme.borderColor}">
    <div class="sidebar-left-title" :style="{borderRightColor: theme.borderColor2, borderBottomColor: theme.borderColor, backgroundColor: theme.navbarColor}">
      <svg :fill="theme.iconColor" class="icon-list" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      <span>Cuprins</span>
    </div>
    <div class="sidebar-left-content" :style="{backgroundColor: theme.backgroundColor2, borderColor: theme.borderColor}">
      <ul class="tree">
        <li class="folder">
          <!-- <icon-folder :folderOpen="folderOpen" :theme="theme"></icon-folder> -->
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
          </svg>
          <span>folder 1923</span>
        </li>
        <li class="branch">
          <ul class="files">
            <li @click="handleFolderClick" class="folder">
              <router-link to="/foo">Caiet1</router-link>
              <!--<span>Caiet 1</span>-->
            </li>
            <li class="branch">
              <ul v-if="true" class="files">
                <li>
                  <span>a</span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="branch">
          <ul class="files">
            <li class="folder">
              <span>b234</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'sidebar-left',
  store,
  props: ['theme'],
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
ul {
  list-style: none;
  padding-left: 10px;
}
li {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.tree {
}
.branch {
}
.folder {
}
.files {
  padding-left: 20px;
}
.icon-tree-folder {
  height: 24px;
  margin-right: 7px;
}
.icon-arrow-right {
  width: 22px;
  margin-right: -7px;
  transform: rotate(-90deg);
}
.icon-arrow-right.toggled {
  transform: rotate(0deg);
}
.icon-folder {
  // width: 21px;
}
.icon-folder-open {
  // width: 21px;
}
</style>
