<script setup>
  import { inject, computed, ref, reactive, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { slugify } from '../helpers.js'

  const props = defineProps({
    creatures: {
      type: Array,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
  })

  const creature = computed(() => {
    return props.creatures.find(c => slugify(c.name) === props.slug)
  })
</script>

<template>
  <h1>{{ creature.name }}</h1>
</template>
