<template>
  <aside class="sidebar-left">
    <div
      class="sidebar-left-title"
      :style="{
        borderRightColor: theme.borderColor2,
        borderBottomColor: theme.borderColor,
        backgroundColor: theme.navbarColor
      }">
      <svg
        class="icon-cuprins"
        :fill="theme.iconColor"
        width="24"
        height="24"
        viewBox="0 0 24 24">
        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      <span>Cuprins</span>
    </div>
    <div
      class="sidebar-left-content"
      :style="{
        backgroundColor: theme.backgroundColor2,
        borderColor: theme.borderColor2
      }">
      <div v-for="(caiet, index) in caieteRef" class="caiet">
        <input type="checkbox" :id="`caiet${index}`" :value="index" v-model="selectedCaiete" class="caiet-input">
        <label
          :for="`caiet${index}`"
          class="caiet-titlu">
          <svg
            :fill="theme.iconColor"
            class="icon-arrow-right"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
          <svg
            class="icon-folder"
            :fill="theme.iconColor"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
          {{caiet.titlu}}
        </label>
        <div class="links-wrapper">
          <router-link
            v-for="poezie in caiet.poezii"
            :to="{
              name: 'Poezie',
              params: {
                adresa: `${poezie.nr}-${poezie.titlu.replace(/\s+/g, '-').toLowerCase()}`,
                titlu: poezie.titlu,
                strofe:poezie.strofe
              }
            }">
            <span
              @click="setSelectedPoezie(poezie.nr)"
              :class="{selected: poezie.nr === selectedPoezie}"
              class="link-poezie">
              <span>{{poezie.nr}}</span>
              <span>{{poezie.titlu}}</span>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'sidebar-left',
  store,
  props: ['theme', 'caieteRef'],
  data () {
    return {
      selectedCaiete: store.state.selectedCaiete
    }
  },
  computed: {
    selectedPoezie () {
      return store.getters.getSelectedPoezie
    }
  },
  methods: {
    setSelectedPoezie (poezie) {
      store.commit('setSelectedPoezie', poezie)
    }
  },
  watch: {
    selectedCaiete () {
      store.commit('setSelectedCaiete', this.selectedCaiete)
    }
  }
}
</script>

<style scoped>
.sidebar-left {
  flex-shrink: 0;
  /*flex-basis: 280px;*/
  width: 300px;
  display: flex;
  flex-direction: column;
}
@media (max-width: 900px) {
  .sidebar-left {
    width: 250px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1
  }
}
.sidebar-left-title {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 64px;
  padding-left: 20px;
  border-right: 1px solid;
  border-bottom: 1px solid;
}
.icon-cuprins {
}
.sidebar-left-content {
  flex-grow: 1;
  padding-top: 4px;
  padding-bottom: 15px;
  border-right: 1px solid;
  overflow: auto;
}
.sidebar-left-content::-webkit-scrollbar {
	width: 8px;
	background-color: transparent;
}
.sidebar-left-content::-webkit-scrollbar-track {
	background-color: hsla(0, 0%, 50%, 0.2);
}
.sidebar-left-content::-webkit-scrollbar-thumb {
	background-color: hsla(0, 0%, 50%, 0.5);;
  border-radius: 4px;
}
.caiet {
}
.caiet-input {
  display: none;
}
.caiet-input:not(:checked) + .caiet-titlu + .links-wrapper {
  display: none;
}
.caiet a {
  text-decoration: none;
  line-height: 1.6;
}
.caiet-titlu {
  display: flex;
  padding: 10px 12px 8px;
  cursor: pointer;
  align-items: center; /*pt mobile*/
  line-height: 100%; /*pt mobile*/
}
.caiet-titlu:hover {
  background-color: hsla(0, 0%, 50%, 0.2);
}
.icon-arrow-right {
  width: 22px;
  margin-right: -7px;
  transform: rotate(-90deg);
}
.caiet-input:checked + .caiet-titlu .icon-arrow-right {
  transform: rotate(0deg);
}
.icon-folder {
  margin-left: 6px;
  margin-right: 4px;
}
.link-poezie {
  display: flex;
  padding-right: 20px;
  padding-left: 18px;
}
.link-poezie span:first-child {
  flex-shrink: 0;
  width: 40px;
  opacity: 0.3;
}
.link-poezie.selected span:first-child {
  opacity: 0.5;
}
.link-poezie:hover {
  background-color: hsla(0, 0%, 50%, 0.2);
}
.selected {
  background-color: hsla(0, 0%, 50%, 0.5);
}
.selected:hover {
  background-color: hsla(0, 0%, 50%, 0.5);
}
</style>
