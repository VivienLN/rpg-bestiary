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
  <div class="search">
    <IconSearch class="icon" />
    <input 
      type="text" 
      placeholder="Chercher..." 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
  .search {
    margin-bottom: 1rem;
    padding: .6rem;
    border: 1px solid #ddd;
    border-radius: .4rem;
    display: flex;
    align-items: center;
    justify-content: stretch;
    gap: .2rem;
  }

  .icon {
    width: 1em;
    padding-top: .2rem;
    fill: #888;
  }

  input[type="text"] {
    border: none;
    width: 100%;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    padding-bottom: .2rem;
    line-height: 1;
  }
</style>