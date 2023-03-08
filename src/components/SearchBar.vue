<script setup>
  import IconSearch from './icons/IconSearch.vue'
  import { ref } from 'vue'

  defineProps({
    modelValue: {
      type: String,
      required: true
    }
  })

  defineEmits([
    'update:modelValue'
  ])
</script>

<template>
  <label class="search">
    <IconSearch class="icon" />
    <input 
      type="text" 
      placeholder="Chercher..." 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<style scoped>
  .search {
    display: block;
    margin-bottom: 2rem;
    padding: 0 .6rem;
    border: 1px solid #ddd;
    border-bottom-width: 3px;
    border-radius: .4rem;
    display: flex;
    align-items: center;
    justify-content: stretch;
    gap: .2rem;
    transition: .4s;
  }

  .icon {
    width: 1.1em;
    padding-top: .2rem;
    margin: 0 .4rem;
    fill: #888;
    transition: .4s;
  }

  input[type="text"] {
    padding: .8rem 0;
    border: none;
    width: 100%;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    line-height: 1;
    font-weight: bold;
  }

  .search:focus-within {
    border-color: var(--color-primary);
  }

  .search:focus-within .icon {
    fill: var(--color-primary);
  }
</style>