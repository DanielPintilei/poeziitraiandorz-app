<template>
  <header
    class="navbar"
    :style="{
      backgroundColor: theme.navbar,
      borderColor: theme.border
    }">
    <div class="navbar__icons-left">
      <div
        :class="{toggled: $store.state.sidebarLeftToggled}"
        class="navbar__icons-toggle navbar__icons-toggle--left">
        <svg
          @click="toggleSidebarLeft"
          v-show="$store.state.sidebarLeftToggled"
          :fill="theme.icon"
          class="icon icon-list-arrow"
          width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
          <path d="M0-.5h24v24H0z" fill="none"/>
        </svg>
        <svg
          @click="toggleSidebarLeft"
          v-show="!$store.state.sidebarLeftToggled"
          :fill="theme.icon"
          class="icon icon-list"
          width="24" height="24">
          <use href="#iconList"></use>
        </svg>
      </div>
      <svg
        @click="toggleMore"
        :fill="$store.state.moreOpen ? theme.accent : theme.icon"
        class="icon icon-more"
        width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
      </svg>
    </div>
    <router-link to="/" class="logo" title="Acasă">
      <svg :fill="theme.logo" class="logo__img"
        width="28.222mm"
        height="12.848mm"
        viewBox="0 0 99.999878 45.523945">
        <path d="m4.4706 0.010515c-0.7248-0.036748-1.4452 0.017118-2.1606 0.25268-3.2301 3.0225 2.4917 2.1602 3.5559 3.4882-0.9796 2.4305-0.6218 5.9924 0.4065 8.1666-1.0076 2.548-6.9372-2.3498-6.2109 1.196 3.0288 1.619 4.9062 4.933 7.7929 6.666 2.7296-0.057 0.2976-5.13 1.1554-6.974-1.6619-1.523-2.9815-5.3041-2.0727-7.3902 2.6426 2.388 1.3057-0.9272 0.3003-2.1533 1.5626-2.7021 6.0976-0.335 8.8626-0.4047 2.651-1.8989-3.184-3.5078-5.049-2.4463-2.1969 0.6432-4.4059-0.29074-6.5804-0.40098zm45.077 1.0895c-1.7359 1.7578 0.99702 5.7599 2.3749 7.3865 0.50366 0.14225 1.1 0.00835 1.4557-0.38818 0.21053-2.3895-0.70801-6.9613-3.8306-6.9983zm-14.046 4.0778c-2.4237-0.037344-4.743 2.6847-5.993 4.7168-2.3236 2.011-5.5478 9.0812-8.4265 4.0338-1.4414-2.6734-3.048-9.2281-7.1832-7.0404-3.5393 2.4903 0.05814 7.321 2.8143 8.7305 3.4824-1.0762-3.8236-4.0258-2.7173-6.5479 3.567-2.6751 4.3614 3.9796 5.7605 5.993 1.6406 4.0904 5.254 0.92708 8.0054 1.2231 1.6868 2.481 5.3074 1.5105 6.9708-1.1627 2.1426 0.02405 2.9675 3.6101 5.8337 2.1222 3.7757 0.9622 5.9436-3.5868 9.7449-3.0487 1.2906 2.1326 4.521 4.2965 6.319 1.9006 2.5412-1.5281 4.2927-0.27918 6.9324-0.50537 3.3071-0.76221 4.8975 1.9788 7.2327 3.5284 0.29757 0.61069 1.3359-0.03027 1.6022-0.37537 2.8774-2.4732 6.1533-4.6541 7.5165-8.3917 2.5793-3.8484 3.2025 3.6351 4.0613 5.2496 1.9522 5.0098 3.8457-1.3895 4.986-3.4442 1.7933 0.23953 2.7966 5.5368 6.1963 3.5284 1.6233 0.59099 7.3917-2.4337 3.5431-2.8107-3.0298 0.8803-6.9362 0.98698-7.2437-3.0743-2.5583-4.8738-4.2351 3.6072-6.2183 2.8125-0.76138-2.4366-1.4116-7.3579-4.9091-6.5222-3.0467 2.0009-4.6249 5.4873-6.4618 8.5162-1.4771 4.6444-6.6571 0.64481-4.5923-2.655 2.2809-2.3056-1.2748-6.0341-3.8031-6.2073-5.1458-1.3161-5.6343 4.3988-6.6595 7.8607-2.2348 2.6321-6.688 2.1865-6.9672-1.7651 0.41578-3.3646-2.4466-2.301-3.9001-0.6189-2.5908 2.0332-5.44 5.2161-9.0912 4.0503-4.3345-1.759-0.5749-6.205-0.93018-9.0125-0.79502-0.75352-1.6146-1.0715-2.4225-1.084zm-0.60608 2.1661c4.4954-0.12313-1.1241 2.4531-2.1588 3.6346l-0.39917 0.48706c-2.2541-0.01584 1.61-3.3535 2.558-4.1217zm29.264 0.74524c0.19471-0.014814 0.39405-0.00392 0.59509 0.032959 5.3691 0.40354 0.82342 4.6613-1.6846 5.6873-3.8722 0.16435-1.8311-5.498 1.0895-5.7202zm-30.239 3.1859c0.62986 0.0047-0.54107 2.453-1.6589 3.1384-3.111 3.3874-1.3878-1.5597 0.36072-2.1735 0.67828-0.69766 1.0883-0.96653 1.2982-0.96497zm-27.995 2.741c0.8454-0.008 2.0185 0.765 1.1609 2.062-0.3542 0.501-1.1496-0.295-1.4264-0.507-0.8513-1.07-0.392-1.548 0.2655-1.555zm15.654 6.3116c-2.0981 0.15926-1.3227 3.5328-0.26001 5.1086 0.91864 2.4633 1.4271 5.1365 1.6058 7.7618-0.96561 1.492-5.0793-0.63763-4.9713 2.0013 1.7292 1.2754 3.361 2.7414 5.2185 3.858 2.2723 0.90501 4.473 3.1772 7.0825 2.005 2.3839-0.99136 0.7709-4.0483 0.63354-5.9564 0.54016-1.6156 4.6402-2.7615 4.7314-0.36987-0.13728 2.3238 0.16056 4.6916 2.6221 5.7074 1.6005 1.864 4.8029 1.4801 6.3684-0.32959 2.5163-1.5503 1.3859-4.5115 1.5894-6.9086 0.16634-1.9775 1.2191-0.65614 1.767 0.29297 1.994 1.9594 0.16239-1.767 1.0986-2.005 1.695-1.2487 4.1269 0.80027 3.3527 2.71-0.66768 1.551 1.2307 5.1641 2.5616 3.0432-0.13438-2.4472-1.0619-5.2128 0.97229-7.132 0.87171-2.3896 3.3787 0.47367 5.1746-0.2124 2.0973 0.19657 4.1234-0.25924 6.1688-0.58777 2.4034-0.29238 0.17118 4.4105-1.0217 2.9407-1.9702-1.8381-2.6858 0.40086-2.0819 2.1039 2.332-1.0053 2.3789 1.0349 1.1169 2.4719-1.5714 1.2944-1.4151 3.6808-2.5012 5.0189-0.42615-1.3751-1.7228-2.2578-3.2446-2.4353-1.3326 1.1338 0.12847 4.008 0.15747 5.7074 0.59709 0.38702 1.447 0.11014 2.1057 0.02014 0.93017-1.8241 2.7384-0.33253 3.7189-0.17212 1.1368 0.18599 2.5076 0.45123 3.6621 0.53833 1.1545 0.08716 2.0069-0.15948 1.6315-1.6919 0.81718-1.5389-1.3097-2.2468-1.3403-0.61523-1.4279 1.9952-6.5362 0.22935-4.6252-2.3273 1.5977-1.5123 1.3526-4.5162 3.327-5.4163 2.2851-0.20354 4.5992 0.27058 6.8829 0.44678 1.4478 0.94041 5.3438-0.768 2.6093-1.9464-2.0745 0.21907-4.1472 0.40931-6.2457 0.44861-2.785 0.54568-2.8503-2.7049-0.7727-3.717 1.2478-2.114 5.5264-1.0671 5.2625-4.0008-1.4598-1.8212-4.0087 0.24205-5.6451 0.92651-2.8274 0.8588-5.8702 1.0204-8.8184 0.89722-2.5118 0.73723-3.4652-2.9158-5.7477-1.8988-0.9233 2.5898-3.8851 1.8119-5.9619 2.7191-1.9229 1.9892-4.2122 1.4051-6.3831 0.19226-2.7219-0.88055-5.1632 1.1465-7.6556 1.7926-2.0128-0.28561-5.8297 2.9256-6.5039-0.11353-0.51064-2.1888-1.0468-4.5498-2.6477-6.2238-1.3002-1.4938-2.8458-2.9745-3.9093-4.5099-0.42449-0.12305-0.78426-0.16557-1.084-0.14282zm0.32044 2.1387c1.6997 0.94243 3.0149 3.1471 4.14 4.8541 0.97398 1.7655 2.6055 3.6755 2.3492 5.766-0.87232 0.39508-2.2376 0.40074-3.1421 0.08972-0.25881-1.7104 0.60868-3.6247-0.30945-5.3503-0.15164-2.2565-3.9192-3.1181-3.0377-5.3595zm20.131 7.8442c1.2828-0.02295 2.643 1.1167 3.0688 2.3364-0.43799 1.8418 0.79429 4.313-0.84778 5.6635l-0.12268 0.23254c-1.4617 1.2305-5.9565 0.73682-5.3888-1.9318 1.4167-1.978-1.1876-4.6703 1.6846-5.4474 0.45619-0.5935 1.0227-0.84284 1.6058-0.85327zm-13.66 4.2224c1.841 0.16587 2.3026 4.4886 0.65369 5.1727-1.0738 0.25872-2.0984-0.10486-2.9846-0.69397-1.3101-1.3586-4.5183-1.665-4.6234-3.4772 1.9912-0.5453 4.0662 0.04575 6.0828-0.79468 0.31724-0.16866 0.60858-0.2306 0.87158-0.20691zm8.9374 0.0824c0.33232-0.01231 0.63434 0.72002 0.32776 1.5417 0.56461 3.1806-1.5429 1.1129-0.83313-0.57312 0.09538-0.68607 0.30598-0.96124 0.50537-0.96863zm3.9294 5.0922c0.06596-0.01762 0.16635 0.01998 0.29846 0.17029-0.39545 0.43962-0.49635-0.11746-0.29846-0.17029zm19.479 2.3712c0.10455-0.01778 0.22563 0.0019 0.36621 0.07325 0.5623 0.28548 1.1055 1.0381 0.60425 1.6699-0.27977 0.3313-0.6495 0.43418-0.93018 0.33508-0.28069-0.09906-0.47652-0.96961-0.49072-1.2891-0.01533-0.34507 0.1368-0.73583 0.45044-0.78918z"/>
      </svg>
    </router-link>
    <div class="navbar__icons-right">
      <div
        @click="closeThemePicker"
        v-if="themePickerToggled"
        class="backdrop backdrop--picker">
      </div>
      <div class="icon-picker-wrapper">
        <svg
          @click="toggleThemePicker"
          :fill="themePickerToggled ? theme.accent : theme.icon"
          :class="{toggled: themePickerToggled}"
          class="icon icon-picker"
          width="24" height="24" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M16.56 8.94L7.62 0 6.21 1.41l2.38 2.38-5.15 5.15c-.59.59-.59 1.54 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.58.59-1.53 0-2.12zM5.21 10L10 5.21 14.79 10H5.21zM19 11.5s-2 2.17-2 3.5c0 1.1.9 2 2 2s2-.9 2-2c0-1.33-2-3.5-2-3.5z"/>
          <path :fill="theme.accent" d="M0 20h24v4H0z" />
        </svg>
        <transition name="theme-picker">
          <theme-picker
            :themes="themes"
            v-if="themePickerToggled">
          </theme-picker>
        </transition>
      </div>
      <div
        :class="{toggled: $store.state.sidebarRightToggled}"
        class="navbar__icons-toggle navbar__icons-toggle--right">
        <svg
          @click="toggleSidebarRight"
          v-show="$store.state.sidebarRightToggled"
          :fill="theme.icon"
          class="icon icon-search-arrow"
          width="24" height="24" viewBox="0 0 24 24">
          <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
          <path d="M0-.25h24v24H0z" fill="none"/>
        </svg>
        <svg
          @click="toggleSidebarRight"
          v-show="!$store.state.sidebarRightToggled"
          :fill="theme.icon"
          class="icon icon-search"
          width="24" height="24">
          <use href="#iconSearch"></use>
        </svg>
      </div>
    </div>
  </header>
</template>

<script>
import ThemePicker from './ThemePicker'

export default {
  name: 'navbar',
  props: ['theme', 'themes'],
  components: {
    ThemePicker
  },
  data () {
    return {
      themePickerToggled: false
    }
  },
  methods: {
    toggleSidebarLeft () {
      this.$store.commit('toggleSidebarLeft')
      if (!this.$store.state.folderListDownloaded) this.$emit('downloadFolderList')
    },
    toggleSidebarRight () {
      this.$store.commit('toggleSidebarRight')
      this.$store.commit('setFullBook')
      if (!this.$store.state.poemsDownloaded) this.$emit('downloadPoems')
    },
    toggleThemePicker () {
      this.themePickerToggled = !this.themePickerToggled
    },
    closeThemePicker () {
      this.themePickerToggled = false
    },
    toggleMore () {
      this.$store.commit('toggleMore')
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../variables"

$iconsGroupWidth = 100px

.backdrop--picker
  position fixed

.navbar
  flex-shrink 0
  height $navbarHeight
  padding 0 7px
  display flex
  align-items center
  justify-content space-between
  border-bottom 1px solid

.navbar__icons-left
  height 24px
  width: $iconsGroupWidth

.icon-list
  margin-left 20px
  @media (max-width $breakpointMobile)
    margin-left 13px

.icon-more
  margin-left 10px

.logo
  display flex

.logo__img
  padding 4px
  cursor pointer

.navbar__icons-right
  height 24px
  width $iconsGroupWidth
  text-align right

.icon-picker-wrapper
  position relative
  display inline-block

.icon-picker
  margin-right 20px
  @media (max-width $breakpointMobile)
    margin-right 0
  &.toggled
    opacity 1

.theme-picker-enter-active
  transition transform $popDuration $sidebarTiming
.theme-picker-leave-active
  transition transform $popDuration $sidebarTiming
.theme-picker-enter
.theme-picker-leave-to
  transform scale(0)

.navbar__icons-toggle
  display inline-block
  transition width 0.2s linear
  &.toggled
    width 24px

.navbar__icons-toggle--right
  width 44px

.navbar__icons-toggle--left
  width 37px

.icon-search
  margin-right 20px
  @media (max-width $breakpointMobile)
    margin-left 13px

.icon-list-arrow
.icon-search-arrow
  @media (max-width $breakpointMobile)
    opacity 0

</style>
