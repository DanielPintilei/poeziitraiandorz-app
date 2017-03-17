<template>
  <aside class="sidebar-left">
    <ul class="tree">
      <li class="folder">
        <icon-folder :folderOpen="folderOpen" :themeIconColor="themeIconColor"></icon-folder>
        <span>folder 1923</span>
      </li>
      <li>
        <ul class="branch">
          <li @click="handleFolderClick" class="folder">
            <icon-folder :folderOpen="folderOpen" :themeIconColor="themeIconColor"></icon-folder>
            <span>Caiet 1</span>
          </li>
          <li>
            <ul v-if="true" class="branch">
              <li>
                <icon-file :themeIconColor="themeIconColor"></icon-file>
                <span>a</span>
              </li>
              <li>
                <icon-file :themeIconColor="themeIconColor"></icon-file>
                <span>b</span>
              </li>
              <li>
                <icon-file :themeIconColor="themeIconColor"></icon-file>
                <span>c</span>
              </li>
              <li>
                <icon-file :themeIconColor="themeIconColor"></icon-file>
                <span>a</span>
              </li>
              <li>
                <icon-file :themeIconColor="themeIconColor"></icon-file>
                <span>b</span>
              </li>
              <li>
                <icon-file :themeIconColor="themeIconColor"></icon-file>
                <span>c</span>
              </li>
              <li>
                <icon-file :themeIconColor="themeIconColor"></icon-file>
                <span>a</span>
              </li>
              <li>
                <icon-file :themeIconColor="themeIconColor"></icon-file>
                <span>b</span>
              </li>
              <li>
                <icon-file :themeIconColor="themeIconColor"></icon-file>
                <span>c</span>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <ul class="branch">
          <li class="folder">
            <icon-folder :folderOpen="folderOpen" :themeIconColor="themeIconColor"></icon-folder>
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
import IconFile from './IconFile'

export default {
  name: 'sidebar-left',
  store,
  components: {
    IconFolder,
    IconFile
  },
  props: ['themeIconColor'],
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
  border-right: 1px solid currentColor;
  overflow: auto;
  padding-right: 20px;
}
.sidebar-left::-webkit-scrollbar {
	width: 6px;
	background-color: transparent;
  // opacity: 0.5;
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
.folder {
  // margin-left: 20px;
}
.tree {
  // padding-left: 30px;
}
.branch {
  padding-left: 20px;
}
</style>
