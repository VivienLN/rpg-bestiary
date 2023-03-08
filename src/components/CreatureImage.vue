<script setup>
  import { computed, ref } from 'vue'
  
  const props = defineProps({
    src: {
      type: String,
      required: true
    },
  })
</script>

<template>
  <a class="img-link" target="_blank" :href="props.src">
    <img :src="props.src" />
  </a>
</template>

<style scoped>

  .img-link {
    display: block;
    border: 1px solid var(--color-gray-light);
    border-bottom-width: 3px;
    padding: .4rem;
    border-radius: .4rem;
    transition: .4s;
    width: 100%;
    white-space: nowrap;
  }

  .img-link:hover, .img-link:focus {
    border-color: var(--color-primary);
    /* background-color: var(--color-gray-light); */
  }

  img {
    display:block;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  
</style>
