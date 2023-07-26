export type ToastType = 'is-success' | 'is-danger' | 'is-info' | 'is-warning'
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export type Toast = {
  id: number
  closeOnClick: boolean
  dismissible: boolean
  duration: number
  message: string
  position: ToastPosition
  title?: string
  type: ToastType
}
