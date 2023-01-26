<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  defineProps({
    paths: {
      type: Array,
      required: true
    }
  })
</script>

<template>
  <nav class="nav-main">
    <ul>
      <li v-for="path in paths">
        <RouterLink :to="'/c/' + path">{{path}}</RouterLink>
      </li>
    </ul>
    <!-- Both work -->
    <ul>
      <li v-for="path in paths">
        <RouterLink :to="{ name: 'creature', params: { creature: path }}">{{path}}</RouterLink>
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
