<template>
  <div class="poezie">
    <h1>{{ titlu }}</h1>
    <!-- <p v-if="currentSearch == null">
      Cauta in poezii
    </p>
    <p v-else>
      Rezultatele pentru: {{ currentSearch }}
    </p> -->
  </div>
</template>

<script>
export default {
  name: 'poezie',
  data () {
    return {
      // titlu: 'Slăvit să fie Domnul!',
      titlu: '',
      strofe: []
    }
  }
}
</script>

<style scoped>
.poezie {
  flex-grow: 1;
  padding: 40px 15px;
  overflow-y: auto;
}
</style>
