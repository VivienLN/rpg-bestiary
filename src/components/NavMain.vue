<script setup>
  import { computed } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { slugify } from '../helpers.js'
  
  const props = defineProps({
    creatures: {
      type: Array,
      required: true
    }
  })

  const sortedCreatures = computed(() => {
    return props.creatures.sort((a, b) => a.name.localeCompare(b.name))
  })

</script>

<template>
  <nav class="nav-main">
    <ul>
      <li v-for="(c, i) in sortedCreatures" :key="i">
        <RouterLink :to="'/c/' + slugify(c.name)">{{c.name}}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  .nav-main {
    width: 50%;
    padding-right: 1rem;
    margin-right: 1rem;
    border-right: 1px solid #eee;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  a {
    color: #000;
    display: block;
    padding: 0.5rem;
    background: #eee;
  }
  a:hover {
    background: #ddd;
  }
  a.router-link-active {
    font-weight: bold;
  }
</style>
