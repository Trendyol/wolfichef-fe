import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Toast } from '@/stores/toast/types'

export const useToast = defineStore('toast', () => {
  const notifications: Ref<Toast[]> = ref([])
  const id: Ref<number> = ref(0)
  const show = (notification: Partial<Toast>) => {
    notifications.value.unshift({
      id: id.value++,
      closeOnClick: notification.closeOnClick ?? false,
      dismissible: notification.dismissible ?? true,
      duration: notification.duration ?? 2500,
      position: notification.position ?? 'top-right',
      title: notification.title,
      message: notification.message ?? '',
      type: notification.type ?? 'is-success'
    })
  }

  const showError = (notification: Partial<Toast>) =>
    show({
      ...notification,
      type: 'is-danger'
    })

  const showSuccess = (notification: Partial<Toast>) =>
    show({
      ...notification,
      type: 'is-success'
    })

  const showInfo = (notification: Partial<Toast>) =>
    show({
      ...notification,
      type: 'is-info'
    })

  const showWarning = (notification: Partial<Toast>) =>
    show({
      ...notification,
      type: 'is-warning'
    })

  const deleteToast = (key: number): void => {
    notifications.value = notifications.value.filter((n: Toast): boolean => n.id !== key)
  }

  return { notifications, deleteToast, show, showError, showSuccess, showInfo, showWarning }
})
