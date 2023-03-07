<script setup>
  import { computed } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { slugify } from '../helpers.js'
  
  const props = defineProps({
    text: {
      type: String,
      required: false
    }
  })

  const splitted = computed(() => {
    if(props.text === undefined) {
      return []
    }
    return props.text.split(/(\[\[.+\]\])/)
  })
</script>

<template>
  <span v-for="(substr, i) in splitted" :key="i">
    <RouterLink 
      v-if="/^(\[\[.+\]\])$/.test(substr)"
      :to="'/c/' + slugify(substr)"
    >
      {{ substr.replace(/\[\[|\]\]/g, '') }}
    </RouterLink>
    <span v-else>{{ substr }}</span>
  </span>
</template>

<style scoped>
a {
  text-decoration: underline;
  color: var(--color-primary);
  font-weight: bold;
}

a:hover, a:focus {
  text-decoration: none;
}
</style>
