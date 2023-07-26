<script setup lang="ts">
import type { Toast, ToastPosition } from '@/stores/toast/types'
import { useToast } from '@/stores/toast'
import type { ComputedRef, DebuggerEvent } from 'vue'
import { computed, defineComponent } from 'vue'
import ToastComponent from '@/components/ToastComponent.vue'

defineComponent({
  components: {
    ToastComponent
  }
})

const store = useToast()

store.$subscribe((mutation) => {
  const events: DebuggerEvent = mutation.events as DebuggerEvent
  if (events.type === 'add') {
    ;(events.target as Toast[]).map((n: Toast) => setTimeout(() => close(n.id), n.duration))
  }
})

const close = (key: number) => {
  store.deleteToast(key)
}

const positions: Array<ToastPosition> = ['top-right', 'top-left', 'bottom-right', 'bottom-left']

const toasts: ComputedRef<{ [key: string]: Toast[] }> = computed(() =>
  positions.reduce(
    (grouped, position) => ({
      ...grouped,
      [position]: store.notifications.filter((toast) => toast.position === position)
    }),
    {}
  )
)
</script>

<template>
  <div
    v-bind:class="[$style['toast-container'], $style[`position-${position}`]]"
    v-bind:key="`toast-container-${position}`"
    v-for="position in positions"
  >
    <ToastComponent
      v-bind:key="`notification-${index}`"
      v-bind:notification="notification"
      v-for="(notification, index) in toasts[position]"
      v-on:close="close"
    />
  </div>
</template>

<style module>
.toast-container {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.position-top-right {
  top: 20px;
  right: 20px;
}

.position-top-left {
  top: 20px;
  left: 20px;
}

.position-bottom-right {
  bottom: 20px;
  right: 20px;
}

.position-bottom-left {
  bottom: 20px;
  left: 20px;
}
</style>
