<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavMain from './components/NavMain.vue'
const paths = [
  'foo', 
  'bar', 
  'baz'
]
</script>

<template>
  <header class="header-main">
    <div class="wrapper">
      <h1>Bestiaire</h1>
    </div>
  </header>

  <div class="wrapper wrapper-main">
    <NavMain :paths="paths" />

    <div class="content-main">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

</style>
