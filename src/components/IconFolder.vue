<template>
  <div class="icon-themed icon-tree-folder">
    <svg :fill="theme.iconColor" :class="{toggled: folderOpen}" class="icon-arrow-right" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10l5 5 5-5z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
    <svg v-if="!folderOpen" class="icon-folder" :fill="theme.iconColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
    <svg v-if="folderOpen" class="icon-folder-open" :fill="theme.iconColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'icon-folder',
  props: ['theme', 'folderOpen'],
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
  transform: rotate(-90deg);
}
.icon-arrow-right.toggled {
  transform: rotate(0deg);
}
.icon-folder {
  width: 21px;
}
.icon-folder-open {
  width: 21px;
}
</style>
