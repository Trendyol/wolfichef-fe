<script setup lang="ts">
import styles from '@/assets/scss/main.module.scss'
import type { Toast, ToastType } from '@/stores/toast/types'

const icons: Record<ToastType, string> = {
  'is-success': styles['icon-circle-success'],
  'is-danger': styles['icon-circle-cross'],
  'is-warning': styles['icon-circle-alert'],
  'is-info': styles['icon-circle-info']
}

defineProps<{ notification: Toast }>()
</script>

<template>
  <div
    v-on:click="() => notification.closeOnClick && $emit('close', notification.id)"
    v-bind:class="[
      styles.notification,
      styles.toast,
      styles[notification.type],
      styles['is-flex'],
      styles['is-gap-2'],
      styles['is-flex-direction-row'],
      styles['is-align-items-center'],
      notification.closeOnClick && styles['is-clickable']
    ]"
  >
    <span v-bind:class="[styles.ico, styles.lg, icons[notification.type]]" />
    <div
      v-bind:class="[
        styles['is-flex'],
        styles['is-flex-direction-column'],
        styles['is-align-items-start'],
        styles['mr-4']
      ]"
    >
      <h1
        v-bind:class="[styles['is-size-5'], styles['has-text-weight-semibold']]"
        v-if="notification.title"
        v-text="notification.title"
      />
      <span v-text="notification.message" />
    </div>
    <button
      v-bind:class="[styles.delete, styles['is-large']]"
      v-if="notification.dismissible"
      v-on:click="$emit('close', notification.id)"
    />
  </div>
</template>
