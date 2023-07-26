<template>
  <p
    v-for="(error, index) in errors[field]"
    v-bind:key="`${field}-error-${index}`"
    v-text="error"
    v-bind:class="[styles.help, styles['is-danger']]"
  />
</template>

<script setup lang="ts" generic="T">
import styles from '@/assets/scss/main.module.scss'

defineProps<{ field: string; errors: Record<string, any> }>()
</script>
