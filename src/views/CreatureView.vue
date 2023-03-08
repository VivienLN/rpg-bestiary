<script setup>
  import { computed, Transition } from 'vue'
  import { useRoute } from 'vue-router'
  import { slugify, toDiceNotation } from '../helpers.js'
  import ComputedText from '../components/ComputedText.vue'
  import IconSword from '../components/icons/IconSword.vue'
  import IconBolt from '../components/icons/IconBolt.vue'
  import IconBow from '../components/icons/IconBow.vue'
  import IconStar from '../components/icons/IconStar.vue'
  import IconSkull from '../components/icons/IconSkull.vue'
  import IconHeart from '../components/icons/IconHeart.vue'


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
      .concat((c.hindrances || []).map(i => formatDetails(i, 'hindrance')))
      .concat((c.edges || []).map(i => formatDetails(i, 'edge')))
      .concat((c.magic || []).map(i => formatDetails(i, 'magic')))
      .concat((c.melee || []).map(i => formatDetails(i, 'melee')))
      .concat((c.ranged || []).map(i => formatDetails(i, 'ranged')))
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
  <div :class="{ unique: creature.unique }">
      <h1 :class="{ joker: creature.joker }">
        <Transition name="icon">
          <IconSkull v-if="creature.joker" class="icon icon-joker" />
        </Transition>

        <Transition name="text" mode="out-in" :duration="300" appear>
          <div :key="slug">
            <span>
              {{ creature.name }}
            </span>
          </div>
        </Transition>

        <span class="hearts">
          <TransitionGroup name="icon">
            <IconHeart v-for="i in creature.hearts" :key="i" class="icon icon-heart" />
          </TransitionGroup>
        </span>
      </h1>

    <Transition name="text" mode="out-in" :duration="300" appear>
      <div class="block block-toughness" :key="slug">
        <h3 class="inline">Rés.&nbsp;:</h3>
        <span>
          {{ creature.toughness.total }} 
          {{ creature.toughness.armor ? `(${creature.toughness.armor})` : "" }}
        </span>
      </div>
    </Transition>

    <Transition name="text" mode="out-in" :duration="300" appear>
      <ul class="block block-attributes" :key="slug">
          <li><h3>Agi</h3><span>{{ toDiceNotation(creature.agi || 4) }}</span></li>
          <li><h3>Âme</h3><span>{{ toDiceNotation(creature.spi || 4) }}</span></li>
          <li><h3>For</h3><span>{{ toDiceNotation(creature.str || 4) }}</span></li>
          <li><h3>Int</h3><span>{{ toDiceNotation(creature.sma || 4) }}</span></li>
          <li><h3>Vig</h3><span>{{ toDiceNotation(creature.vig || 4) }}</span></li>
          <li><h3>Allure</h3><span>{{ creature.pace || 6 }}</span></li>
          <li><h3>Parade</h3><span>{{ creature.parry }}</span></li>
      </ul>
    </Transition>

    <Transition name="slide" mode="out-in" :duration="400" appear>
      <div class="skills" :key="slug">
        <h3 class="inline">Compétences&nbsp;:</h3>
        {{ creature.skills.map(s => `${s[0]}&nbsp;${toDiceNotation(s[1])}`).join(', ') }}
      </div>
    </Transition>

    <Transition name="slide" mode="out-in" :duration="400" appear>
      <ul class="details" :key="slug">
        <li v-for="(d, i) in details" :key="i" :class="d.type">
          <h4 class="inline">
            <IconSword v-if="d.type=='melee'" class="icon" />
            <IconBow v-if="d.type=='ranged'" class="icon" />
            <IconBolt v-if="d.type=='magic'" class="icon" />
            <IconStar v-if="d.type=='edge'" class="icon" />
            <IconStar v-if="d.type=='hindrance'" class="icon" />
            {{ d.name }}{{ d.description ? "&nbsp;:" : "" }}
          </h4>
          <computed-text :text="d.description" />
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
  h1 {
    background: linear-gradient(165deg, var(--color-primary) 20%, var(--color-primary-2) 100%);
    border-radius: .4rem;
    padding: .3rem 1rem .4rem;
    margin-bottom: .4rem;
    color: #fff;
    text-transform: uppercase;
    font-size: 1.25em;
    letter-spacing: -.02em;
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: space-between;
    transition: .4s;
  }
  h1 span {
    display: inline-block;
  }
  h1.joker {
    padding-left: 3.2rem;
  }
  h1 .icon {
    fill: #fff;
  }
  h1 .hearts {
    flex-grow: 1;
    text-align: right;
    white-space: nowrap;
    direction: rtl; /* reverse order form animation */
  }
  h1 .icon-heart {
    fill: #fff;
    margin-left: .4rem;
    margin-top: -.1em;
    margin-bottom: -.1em;
    height: .9em;
  }
  h1 .icon-joker {
    height: 2.8rem;
    position: absolute;
    top: -.2rem;
    left: .2rem;
    filter: drop-shadow(-1px -1px 0 var(--color-primary))
            drop-shadow(0 -1px 0 var(--color-primary))
            drop-shadow(1px -1px 0 var(--color-primary))
            drop-shadow(-1px 0 0 var(--color-primary))
            drop-shadow(0 0 0 var(--color-primary))
            drop-shadow(1px 0 0 var(--color-primary))
            drop-shadow(-1px 1px 0 var(--color-primary))
            drop-shadow(0 1px 0 var(--color-primary))
            drop-shadow(1px 1px 0 var(--color-primary));
  }
  .inline {
    font-size: inherit;
    font-weight: bold;
    display: inline-block;
    margin-right: .2rem;
  }
  .block {
    background: var(--color-gray-light);
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

  .block-toughness span {
    display: inline-block;
  }

  .block-attributes {
    display: flex;
    list-style: none;
    justify-content: space-between;
    text-align: center;
    padding-bottom: .6rem;
    margin-bottom: 1.2rem;
  }
  .block-attributes h3 {
    margin-bottom: 0;
    font-size: inherit;
  }
  .block-attributes span {
    font-weight: bold;
    display: inline-block;
  }

  .skills {
    margin-bottom: 1.2rem;
  }

  .details {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .details li {
    position: relative;
    padding-left: 1.26em;
  }

  .details li .icon {
    position: absolute;
    left: 0;
    top: .16em;
  }

  .details h4 {
    font-weight: bold;
  }

  .unique h1 .icon-joker {
    filter: drop-shadow(-1px -1px 0 var(--color-unique))
            drop-shadow(0 -1px 0 var(--color-unique))
            drop-shadow(1px -1px 0 var(--color-unique))
            drop-shadow(-1px 0 0 var(--color-unique))
            drop-shadow(0 0 0 var(--color-unique))
            drop-shadow(1px 0 0 var(--color-unique))
            drop-shadow(-1px 1px 0 var(--color-unique))
            drop-shadow(0 1px 0 var(--color-unique))
            drop-shadow(1px 1px 0 var(--color-unique));
  }

  .unique h1 {
    background: linear-gradient(165deg, var(--color-unique) 20%, var(--color-unique-2) 100%);
  }

  .text-enter-active span,
  .text-leave-active span {
    transition: all .2s ease;
  }

  .text-enter-from span {
    opacity: 0;
    transform: translateX(-4px);
  }
  .text-leave-to span {
    opacity: 0;
    transform: translateX(4px);
  }

  .icon-enter-active,
  .icon-leave-active {
    transition: all .4s ease-in-out;
  }

  .icon-enter-from,
  .icon-leave-to {
    opacity: 0;
    transform: scale(.6, .6);
  }

  .slide-leave-active {
    transition: all .3s ease-out;
  }

  .slide-leave-to {
    opacity: 0;
    transform: translateX(18px);
  }
  
  .slide-enter-active {
    transition: all .3s ease-out;
  }

  .slide-enter-from {
    opacity: 0;
    transform: translateX(-18px);
  }

  .slide-enter-active.details,
  .slide-leave-active.details { transition-delay: .1s; }
  /* h1.v-leave-active { transition-delay: 0; }
  .block-toughness.v-leave-active { transition-delay: .1s; }
  .block-attributes.v-leave-active { transition-delay: .2s; }
  .skills.v-leave-active { transition-delay: .3s; }
  .details.v-leave-active { transition-delay: .4s; } */

</style>