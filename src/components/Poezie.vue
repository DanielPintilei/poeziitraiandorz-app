<template>
  <div class="poezie">
    <!-- <p v-if="currentSearch == null">
      Cauta in poezii
    </p>
    <p v-else>
      Rezultatele pentru: {{ currentSearch }}
    </p> -->
    <h1>
      {{ titlu }}
    </h1>
    <div v-for="strofa in strofe">
      <p>
        {{ strofa }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'poezie',
  props: ['titlu', 'strofe'],
  data () {
    return {
    }
  }
  // mounted: function () {
  //   setTimeout(() => {
  //   }, 3000)
  // }
}
</script>

<style scoped>
.poezie {
  /*flex-grow: 1;
  padding: 40px 15px;
  overflow-y: auto;*/
  padding: 40px;
}
</style>
