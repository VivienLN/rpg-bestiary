<script setup>
  import { RouterLink, RouterView, useRoute } from 'vue-router'
  import { ref, computed, Transition } from 'vue'
  import NavMain from './NavMain.vue'
  import SearchBar from './SearchBar.vue'
  import Checkbox from './Checkbox.vue'

  defineProps({
    creatures: {
      type: Array,
      required: true
    }
  })

  const route = useRoute()
  const slug = computed(() => route.params.creature)

  const search = ref('')
  const showJokers = ref(true)
  const showUniques = ref(true)
</script>

<template>
  <div class="wrapper">
    <SearchBar 
      v-model:terms="search" 
      v-model:showJokers="showJokers" 
      v-model:showUniques="showUniques" 
    />
  </div>

  <div class="wrapper wrapper-main">
    <NavMain 
      :creatures="creatures" 
      :slug="slug" 
      :search="search" 
      :showJokers="showJokers" 
      :showUniques="showUniques" 
    />

    <div class="content-main">
      <RouterView :creatures="creatures" :slug="slug" />
    </div>
  </div>
</template>
