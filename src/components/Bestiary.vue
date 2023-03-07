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
  const slug = computed(() => route.params.creature)
</script>

<template>
  <div class="wrapper wrapper-main">
    <NavMain :creatures="creatures" :slug="slug" />

    <div class="content-main">
      <RouterView :creatures="creatures" :slug="slug" />
    </div>
  </div>
</template>
