<template>
  <div v-bind:class="[styles['h-100'], styles['is-vertical-center']]">
    <div v-bind:class="[styles['is-flex'], styles['is-flex-direction-column']]">
      <div
        v-if="text === 'Loading'"
        v-bind:class="[
          styles['column'],
          styles['is-full'],
          styles['is-flex'],
          styles['is-justify-content-center']
        ]"
      >
        <span v-bind:class="styles.loader" />
      </div>
      <div
        v-bind:class="[
          styles['column'],
          styles['is-full'],
          styles['is-flex'],
          styles['is-justify-content-center']
        ]"
      >
        <h1 v-text="text" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from '@/assets/scss/main.module.scss'
import utils from '@/utils'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const text = ref('Loading')

if (useRoute().query.state === localStorage.state) {
  utils
    .fetchGitlabToken(useRoute().query.code!.toString())
    .then(() => {
      text.value = 'Successfully crafted the token, you can close this window.'
      new BroadcastChannel('oauth').postMessage('')
      window.close()
    })
    .catch(({ error_description }) => (text.value = error_description))
} else {
  text.value = 'Please close this window and click the Gitlab link again.'
}
</script>
