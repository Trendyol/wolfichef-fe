<script setup lang="ts">
import ToastContainer from '@/components/ToastContainer.vue'
import styles from '@/assets/scss/main.module.scss'
import { RouterView } from 'vue-router'
</script>

<template>
  <div v-bind:class="styles.container">
    <RouterView />
  </div>
  <footer v-bind:class="styles.footer">
    <div v-bind:class="[styles.content, styles['has-text-centered']]">
      Made with
      <span
        v-bind:class="[styles.ico, styles['icon-heart'], styles['beat-fade']]"
        v-bind:style="{ color: '#d0021b' }"
      />
      by <a href="https://github.com/Trendyol/AppSec">Trendyol AppSec</a>.
    </div>
  </footer>
  <ToastContainer />
</template>
