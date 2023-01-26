<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { provide } from 'vue'
import NavMain from './components/NavMain.vue'

const creatures = [
  {name: "Foo Monster", slug: "foo-monster"},
  {name: "Bar Monster", slug: "bar-monster"},
]
provide('creatures', creatures)
</script>

<template>
  <header class="header-main">
    <div class="wrapper">
      <h1>Bestiaire</h1>
    </div>
  </header>

  <div class="wrapper wrapper-main">
    <NavMain />

    <div class="content-main">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

</style>
