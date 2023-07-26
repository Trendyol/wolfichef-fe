<template>
  <Multiselect
    placeholder="placeholder"
    v-bind:options="registries"
    v-bind:classes="{
      dropdown: [styles['multiselect-dropdown'], 'multiselect-dropdown'],
      option: ['multiselect-option', styles['multiselect-option']],
      optionPointed: styles['multiselect-option-pointed'],
      optionSelected: styles['multiselect-option-pointed'],
      optionSelectedPointed: styles['multiselect-option-pointed'],
      placeholder: ['multiselect-placeholder', $style['has-icons-left']],
      singleLabel: ['multiselect-single-label', $style['has-icons-left']]
    }"
    v-bind:canClear="false"
    v-bind:canDeselect="false"
    ref="multiselect"
  >
  </Multiselect>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import styles from '@/assets/scss/main.module.scss'
import type { MultiSelectAPI } from '@/types'
import type { Ref } from 'vue'
import { defineComponent, ref } from 'vue'
import utils from '@/utils'

const multiselect: Ref<MultiSelectAPI | undefined> = ref()
const registries: Ref<string[]> = ref([])

defineComponent({
  components: {
    Multiselect
  }
})

utils.fetchGitlabUser().then(({ id }) => {
  registries.value = []
  utils.fetchGitlabStarredProjects(id).then((projects) => {
    projects.map((project) => registries.value.push(project.container_registry_image_prefix))
    registries.value.length > 0 && multiselect.value?.select(registries.value[0])
  })
})
</script>

<style lang="scss" module>
.container {
  width: 400px;
}

.wrapper {
  width: max-content;
  margin: 0;
}

.has-icons-left {
  padding-left: 2.5em;
}
</style>
