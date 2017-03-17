<template>
  <aside class="sidebar-left">
    <ul class="tree">
      <li class="folder">
        <icon-folder :qwe="themeIconColor"></icon-folder>
        <span>1923</span>
      </li>
      <li>
        <ul class="tree-folder">
          <li>
            <span>Caiet 1</span>
          </li>
          <ul>
            <li>a</li>
            <li>b</li>
            <li>c</li>
          </ul>
        </ul>
      </li>
      <li>b123</li>
      <li>
        <ul class="tree-folder">
          <li>b234</li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
// import IconFolder from './components/IconFolder'

export default {
  name: 'sidebar-left',
  // components: {
  //   IconFolder
  // },
  props: ['themeIconColor'],
  methods: {
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.sidebar-left {
  flex-shrink: 0;
  flex-basis: 300px;
  border-right: 1px solid currentColor;
  // background-color: papayawhip;
}
ul {
  list-style: none;
  padding-left: 20px;
}
li {
  display: flex;
  align-items: center;
}
</style>
