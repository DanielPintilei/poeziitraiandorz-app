<template>
  <aside class="sidebar-left" :style="{borderColor: theme.borderColor}">
    <ul class="tree">
      <li class="folder">
        <icon-folder :folderOpen="folderOpen" :theme="theme.iconColor2"></icon-folder>
        <span>folder 1923</span>
      </li>
      <li class="branch">
        <ul class="files">
          <li @click="handleFolderClick" class="folder">
            <icon-folder :folderOpen="folderOpen" :theme="theme.iconColor2"></icon-folder>
            <span>Caiet 1</span>
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
            <icon-folder :folderOpen="folderOpen" :theme="theme.iconColor2"></icon-folder>
            <span>b234</span>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
import { store } from '../store/index'

import IconFolder from './IconFolder'

export default {
  name: 'sidebar-left',
  store,
  props: ['theme'],
  components: {
    IconFolder
  },
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
  flex-basis: 300px;
  border-right: 1px solid;
  overflow: auto;
  padding-right: 20px;
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
</style>
