<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { inject } from 'vue'

  const creatures = inject('creatures')
</script>

<template>
  <nav class="nav-main">
    <ul>
      <li v-for="c in creatures" :key="c.slug">
        <RouterLink :to="'/c/' + c.slug">{{c.name}}</RouterLink>
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
