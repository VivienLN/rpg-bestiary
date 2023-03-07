<script setup>
  import { computed } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { slugify } from '../helpers.js'
  import IconSkull from '../components/icons/IconSkull.vue'
  
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
        <RouterLink :to="'/c/' + slugify(c.name)">
          {{c.name}}
          <IconSkull v-if="c.joker" class="icon" />
        </RouterLink>
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
  }
  .icon {
    height: 1em;
    vertical-align: middle;
    position: relative;
    top: -.1rem;
  }
  a:hover {
    background: #f5f5f5;
    transition: .2s;
  }
  a.router-link-active {
    font-weight: bold;
    background: #eaeaea;
    color: #c54859;
  }
  a.router-link-active svg {
    fill: #c54859;
  }
</style>
