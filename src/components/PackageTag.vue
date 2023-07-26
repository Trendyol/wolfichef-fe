<template>
  <Popper arrow hover placement="top">
    <template #content>
      <table v-bind:class="[styles.table, styles['mb-0']]">
        <tbody>
          <tr>
            <td>
              <b>Name</b>
            </td>
            <td v-text="value.option.name" />
          </tr>
          <tr>
            <td><b>Description</b></td>
            <td v-text="value.option.description" />
          </tr>
          <tr>
            <td><b>Version</b></td>
            <td v-text="value.option.version" />
          </tr>
          <tr>
            <td><b>Size</b></td>
            <td v-text="utils.humanReadableBytes(value.option.installed_size)" />
          </tr>
        </tbody>
      </table>
    </template>
    <span
      v-bind:class="[classes.tag, value.option.disabled ? classes.tagDisabled : null]"
      tabindex="-1"
      v-on:keyup.enter="value.handleTagRemove(value.option, $event)"
    >
      {{ value.option['name'] }}
      <span
        v-if="!value.disabled && !value.option.disabled"
        v-bind:class="classes.tagRemove"
        v-on:click.stop="value.handleTagRemove(value.option, $event)"
      >
        <span v-bind:class="classes.tagRemoveIcon"></span>
      </span>
    </span>
  </Popper>
</template>

<script setup lang="ts">
import Popper from 'vue3-popper'
import styles from '@/assets/scss/main.module.scss'
import type { TagValue } from '@/types'
import { defineComponent } from 'vue'
import utils from '@/utils'

const classes = {
  tag: 'multiselect-tag',
  tagDisabled: 'is-disabled',
  tagRemove: 'multiselect-tag-remove',
  tagRemoveIcon: 'multiselect-tag-remove-fonts'
}

defineComponent({
  components: {
    Popper
  }
})

defineProps<{ value: TagValue }>()
</script>
