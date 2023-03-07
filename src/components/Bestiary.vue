<script setup>
  import { RouterLink, RouterView, useRoute } from 'vue-router'
  import { ref, computed, inject, onMounted, provide } from 'vue'
  import NavMain from './NavMain.vue'
  import SearchBar from './SearchBar.vue'
  import FuzzySet from 'fuzzyset'

  defineProps({
    creatures: {
      type: Array,
      required: true
    }
  })

  const route = useRoute()
  const slug = computed(() => route.params.creature)

  const search = ref('')
</script>

<template>
  <div class="wrapper">
    <SearchBar v-model="search" />
  </div>

  <div class="wrapper wrapper-main">
    <NavMain :creatures="creatures" :slug="slug" :search="search" />
    <div class="content-main">
      <RouterView :creatures="creatures" :slug="slug" />
    </div>
  </div>
</template>
