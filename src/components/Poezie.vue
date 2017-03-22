<template>
  <div class="poezie">
    <!--<h1>{{ titlu }}</h1>-->
    <!-- <p v-if="currentSearch == null">
      Cauta in poezii
    </p>
    <p v-else>
      Rezultatele pentru: {{ currentSearch }}
    </p> -->
    Poezie ID ruta titlu: {{ $route.params.ruta }}
<br>
    <div v-for="strofa in strofe">
      {{ strofa }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'poezie',
  props: ['strofe'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.poezie {
  /*flex-grow: 1;
  padding: 40px 15px;
  overflow-y: auto;*/
}
</style>
