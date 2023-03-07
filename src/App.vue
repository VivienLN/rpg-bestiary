<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { defineAsyncComponent, onMounted, reactive, ref } from 'vue'
  import NavMain from './components/NavMain.vue'
  import Loading from './components/Loading.vue'
  import Bestiary from './components/Bestiary.vue'

  const creatures = ref(null)

  onMounted(async () => {
    let response = await fetch('/src/data/creatures.json')
    let data = await response.json()
    creatures.value = data
  })
</script>

<template>
  <header class="header-main">
    <div class="wrapper">
      <h1>
        <RouterLink to="/">Bestiaire</RouterLink>
      </h1>
    </div>
  </header>

  <Bestiary v-if="creatures" :creatures="creatures" />
  <Loading v-else />

</template>

<style scoped>

</style>
