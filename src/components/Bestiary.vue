<script setup>
  import { RouterLink, RouterView, useRoute } from 'vue-router'
  import { computed, inject, onMounted, provide } from 'vue'
  import NavMain from './NavMain.vue'

  defineProps({
    creatures: {
      type: Array,
      required: true
    }
  })

  const route = useRoute()
  const slug = computed(() => {console.log("PUTAIND E SA MERE", route.params.creature); return route.params.creature; })
</script>

<template>
  <div class="wrapper wrapper-main">
    Bestiaire
    <NavMain :creatures="creatures" :slug="slug" />

    <div class="content-main">
      <RouterView :creatures="creatures" :slug="slug" />
    </div>
  </div>
</template>
