<template>
  <div v-bind:class="[styles.notification, styles['is-primary'], styles['is-light']]">
    <button
      type="button"
      v-bind:class="styles.delete"
      v-on:click="
        (e) => {
          const $target = (e.target as HTMLElement).parentNode!
          $target.parentNode!.removeChild($target)
        }
      "
    ></button
    ><slot></slot>
  </div>
</template>

<script lang="ts" setup>
import styles from '@/assets/scss/main.module.scss'
</script>
