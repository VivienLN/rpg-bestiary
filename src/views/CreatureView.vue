<script setup>
  import { inject, computed, ref, reactive, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { slugify, toDiceNotation } from '../helpers.js'
  import IconSword from '../components/icons/IconSword.vue'
  import IconBolt from '../components/icons/IconBolt.vue'
  import IconBow from '../components/icons/IconBow.vue'
  import IconStar from '../components/icons/IconStar.vue'


  const props = defineProps({
    creatures: {
      type: Array,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
  })

  const creature = computed(() => {
    return props.creatures.find(c => slugify(c.name) === props.slug)
  })

  const details = computed(() => {
    let c = creature.value
    return []
      .concat(c.hindrances.map(i => formatDetails(i, 'hindrance')))
      .concat(c.edges.map(i => formatDetails(i, 'edge')))
      .concat(c.magic.map(i => formatDetails(i, 'magic')))
      .concat(c.melee.map(i => formatDetails(i, 'melee')))
      .concat(c.ranged.map(i => formatDetails(i, 'ranged')))
  })

  const formatDetails = function(value, type) {
    return {
      name: value[0],
      description: value[1],
      type: type
    }
  }
</script>

<template>
  <h1>{{ creature.name }}</h1>
  <div class="block block-toughness">
    <h3 class="inline">Rés.&nbsp;:</h3>
    <span>{{ creature.toughness.total }} ({{ creature.toughness.armor }})</span>
  </div>
  <ul class="block block-attributes">
    <li><h3>Agi</h3><span>{{ toDiceNotation(creature.agi) }}</span></li>
    <li><h3>Âme</h3><span>{{ toDiceNotation(creature.spi) }}</span></li>
    <li><h3>Int</h3><span>{{ toDiceNotation(creature.sma) }}</span></li>
    <li><h3>Vig</h3><span>{{ toDiceNotation(creature.vig) }}</span></li>
    <li><h3>Allure</h3><span>{{ creature.pace }}</span></li>
    <li><h3>Parade</h3><span>{{ creature.parry }}</span></li>
  </ul>
  <div class="skills">
    <h3 class="inline">Compétences&nbsp;:</h3>
    {{ creature.skills.map(s => `${s[0]} ${toDiceNotation(s[1])}`).join(', ') }}
  </div>
  <ul class="details">
    <li v-for="(d, i) in details" :key="i" :class="d.type">
      <h4 class="inline">
        <IconSword v-if="d.type=='melee'" class="icon" />
        <IconBow v-if="d.type=='ranged'" class="icon" />
        <IconBolt v-if="d.type=='magic'" class="icon" />
        <IconStar v-if="d.type=='edge'" class="icon" />
        <IconStar v-if="d.type=='hindrance'" class="icon" />
        {{ d.name }}
        {{ d.description ? "&nbsp;:" : "" }}
      </h4> 
      {{ d.description }}
    </li>
  </ul>
</template>

<style scoped>
  h1 {
    background: #ae4e9d;
    border-radius: .4rem;
    padding: .4rem 1rem;
    margin-bottom: .4rem;
    color: #fff;
    text-transform: uppercase;
    font-size: 1.215em;
    font-weight: bold;
  }
  .inline {
    font-size: inherit;
    font-weight: bold;
    display: inline-block;
    margin-right: .2rem;
  }
  .block {
    background: #eee;
    margin: 0 0 .4rem;
    border-radius: .4rem;
    padding: .4rem 1rem;
  }
  .icon {
    height: 1em;
    width: auto;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    top: -.1em;
  }

  .block-toughness {
    font-weight: normal;
  }

  .block-attributes {
    display: flex;
    list-style: none;
    justify-content: space-between;
    text-align: center;
    padding-bottom: .6rem;
    margin-bottom: 1rem;
  }
  .block-attributes h3 {
    margin-bottom: 0;
    font-size: inherit;
  }
  .block-attributes span {
    font-weight: bold;
  }

  .skills {
    margin-bottom: 1rem;
  }

  .details {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .details li {
    margin-bottom: .2rem;
  }

  .details h4 {
    font-weight: bold;
  }

</style>