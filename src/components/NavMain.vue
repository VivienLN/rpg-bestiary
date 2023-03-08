<script setup>
  import { computed, ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { slugify } from '../helpers.js'
  import IconSkull from '../components/icons/IconSkull.vue'
  import Fuzzyset from 'fuzzyset'
  
  const props = defineProps({
    creatures: {
      type: Array,
      required: true
    },
    search: {
      type: String,
      required: false
    }
  })

  // Append tags to creatures, tags being anything we can search on:
  // name, hindrances, etc.
  const allTags = ref([]);
  const taggedCreatures = computed(() => {
    return props.creatures.map(c => {
      let tags = []
      tags.push(c.name)
      tags.push(c.name.split(/[\s-]/))
      tags.push((c.skills || []).map(d => d[0]))
      tags.push((c.hindrances || []).map(d => d[0]))
      tags.push((c.edges || []).map(d => d[0]))
      tags.push((c.melee || []).map(d => d[0]))
      tags.push((c.ranged || []).map(d => d[0]))
      tags.push((c.magic || []).map(d => d[0]))
      c.tags = tags
        .flat(10)
        .map(t => t.toLowerCase().replace(/[-_\[\(\]\)"']/g, ''))
        .filter(t => t.length >= 4)
      allTags.value.push(...c.tags)
      return c
    })
  })

  const filteredCreatures = computed(() => {
    var creatures = taggedCreatures.value
    if(props.search)  {
      // Search in the global tags list
      let results = Fuzzyset(allTags.value).get(props.search, null, .6)
      if(results) {
        // Add score to creature objects
        creatures = creatures.map(c => {
          // Add the score of each tag in results (if associated to this creature)
          let score = results.reduce((total, r) => {
            let confidence = r[0]
            let foundTag = r[1]
            if(c.tags.includes(foundTag)) return total + confidence
            return total
          }, 0)
          c.score = score
          return c
        })
        // Filtered creatures
        return creatures.filter(c => c.score > 0).sort((a, b) => b.score - a.score)
      }
      // No result
      return []
    }
    // All creatures, no filter
    return creatures.sort((a, b) => a.name.localeCompare(b.name))
  })

</script>

<template>
  <div class="nav-main--wrapper">
    <nav class="nav-main">
      <ul v-if="filteredCreatures.length">
        <li v-for="(c, i) in filteredCreatures" :key="i">
          <RouterLink :to="'/c/' + slugify(c.name)" :class="{ unique: c.unique }">
            {{c.name}}
            <IconSkull v-if="c.joker" class="icon" />
          </RouterLink>
        </li>
      </ul>
      <div v-else>
        Aucun résultat trouvé :(
      </div>
    </nav>
  </div>
</template>

<style scoped>
  .nav-main {
    margin-bottom: 2rem;
    height: 25vh;
    overflow-y: auto;
  }
  .nav-main--wrapper {
    position: relative;
  }
  .nav-main--wrapper::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 6px;
    background: linear-gradient(180deg, rgba(0,0,0,0) 10%, rgba(0,0,0,.2) 100%);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  a {
    color: #000;
    display: block;
    padding: .4rem .6rem;
    border-radius: .4rem;
    margin-bottom: .2rem;
  }
  .icon {
    height: 1em;
    vertical-align: middle;
    position: relative;
    top: -.1rem;
  }
  a:hover {
    background: var(--color-gray-light);
    transition: .2s;
  }
  a.router-link-active {
    font-weight: bold;
    background: var(--color-gray-light);
    color: var(--color-primary);
  }
  a.router-link-active svg {
    fill: var(--color-primary);
  }
  
  a.unique.router-link-active {
    color: var(--color-unique);
  }
  a.unique.router-link-active svg {
    fill: var(--color-unique);
  }

  @media (min-width: 768px) { 
    .nav-main--wrapper {
      width: 37.5%;
    }
    .nav-main--wrapper::after {
      display: none;
    }
    .nav-main {
      padding-right: 1rem;
      margin-right: 1rem;
      border-right: 1px solid var(--color-gray-light);
      margin-bottom: 0;
      height: 100%;
      overflow-y: visible;
    }
  }
</style>
