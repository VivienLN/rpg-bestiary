<script setup>
  import IconSearch from './icons/IconSearch.vue'
  import Checkbox from './Checkbox.vue'
  import { ref } from 'vue'

  defineProps({
    terms: {
      type: String,
      required: true
    },
    showJokers: {
      type: Boolean,
      required: true
    },
    showUniques: {
      type: Boolean,
      required: true
    }
  })

  defineEmits([
    'update:terms',
    'update:showJokers',
    'update:showUniques'
  ])
</script>

<template>
  <label class="search">
    <IconSearch class="icon" />
    <input 
      type="text" 
      placeholder="Chercher..." 
      :value="terms"
      @input="$emit('update:terms', $event.target.value)"
    />
  </label>
  <div class="filters">
    <Checkbox
      class="filter"
      :value="showJokers"
      @change="(checked) => $emit('update:showJokers', checked)"
    >
      Jokers
    </Checkbox>
    <Checkbox
      class="filter"
      :value="showUniques"
      @change="(checked) => $emit('update:showUniques', checked)"
    >
      Ennemis uniques
    </Checkbox>
  </div>
</template>

<style scoped>
  .search {
    display: block;
    margin-bottom: .4rem;
    padding: 0 .6rem;
    border: 1px solid var(--color-gray-light);
    border-bottom-width: 3px;
    border-radius: .4rem;
    display: flex;
    align-items: center;
    justify-content: stretch;
    gap: .2rem;
    transition: .4s;
  }

  .search .icon {
    width: 1.1em;
    padding-top: .2rem;
    margin: 0 .4rem;
    fill: #888;
    transition: .4s;
  }

  .filters {
    margin-bottom: 2rem;
    padding-left: .4rem;
  }

  .filter {
    margin-right: 1rem;
  }

  input[type="text"] {
    padding: .8rem 0;
    border: none;
    width: 100%;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    line-height: 1;
  }

  .search:focus-within {
    border-color: var(--color-primary);
  }

  .search:focus-within .icon {
    fill: var(--color-primary);
  }
</style>