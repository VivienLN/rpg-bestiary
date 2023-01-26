<script setup>
  import { inject, computed } from 'vue'
  import { useRoute } from 'vue-router'

  const creatures = inject('creatures')
  const route = useRoute()

  // Fetch creature info
  const creature = computed(() => {
    return creatures.find(c => c.slug === route.params.creature)
  })
</script>

<template>
  <h1>{{ creature.name }}</h1>
</template>
