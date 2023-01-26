<script setup>
  import { inject, computed, ref, reactive, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

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
    return props.creatures.find(c => c.slug === props.slug)
  })
</script>

<template>
  <h1>{{ creature.name }}</h1>
  <ul>
    <li v-for="c in creatures" :key="c.slug">
      {{c.name}}
    </li>
  </ul>
  <!-- <h1>{{ creature.name }}</h1> -->
</template>
