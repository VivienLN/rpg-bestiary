<script setup>
  import { ref } from 'vue'
  import IconCheck from "./icons/IconCheck.vue"

  defineProps({
    value: {
      type: Boolean,
      required: true
    }
  })

  defineEmits([
    'change'
  ])
</script>

<template>
  <label>
    <input 
      type="checkbox" 
      :checked="value"
      @change="$emit('change', $event.target.checked)"
    />
    <span class="box">
      <IconCheck class="icon" />
    </span>
    <span class="label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
  label {
    cursor: pointer; 
  }
  .box {
    display: inline-block;
    vertical-align: middle;
    border: 1px solid var(--color-gray-light);
    border-bottom-width: 2px;
    height: 1.24em;
    width: 1.24em;
    border-radius: .2rem;
    position: relative;
    top: -.1rem;
    color: var(--color-primary);
    transition: .4s;
    margin-right: .2rem;
  }

  .label {
    color: var(--color-gray);
  }

  .icon {
    height: .9em;
    position: absolute;
    top: .1em;
    left: .1em;
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    transition: .2s;
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"]:checked ~ .box {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  input[type="checkbox"]:checked ~ .label {
    color: inherit;
  }

  input[type="checkbox"]:active ~ .label {
    color: var(--color-primary);
  }

  input[type="checkbox"]:checked + .box .icon {
    display: inline-block;
    clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0);
  }
</style>