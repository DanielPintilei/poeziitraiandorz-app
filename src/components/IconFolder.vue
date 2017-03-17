<template>
  <div class="icon-themed icon-tree-folder">
    <svg :fill="themeIconColor" :class="{toggled: folderOpen}" class="icon-arrow-right" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
      <path d="M0-.25h24v24H0z" fill="none"/>
    </svg>
    <svg v-if="!folderOpen" class="icon-folder" :fill="themeIconColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
    <svg v-if="folderOpen" class="icon-folder-open" :fill="themeIconColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'icon-folder',
  props: ['themeIconColor', 'folderOpen'],
  data () {
    return {
    }
  },
  methods: {
    toggleCaret () {

    }
  }
}
</script>

<style scoped>
.icon-tree-folder {
  height: 24px;
  margin-right: 7px;
}
.icon-arrow-right {
  width: 22px;
  margin-right: -7px;
}
.icon-arrow-right.toggled {
  transform: rotate(90deg);
}
.icon-folder {
  width: 21px;
}
.icon-folder-open {
  width: 21px;
}
</style>
