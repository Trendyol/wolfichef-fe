import styles from '@/assets/scss/main.module.scss'

const textHoverEnter = (e: MouseEvent) =>
  (e.target as HTMLElement).classList.add(styles['has-text-primary'])

const textHoverLeave = (e: MouseEvent) =>
  (e.target as HTMLElement).classList.remove(styles['has-text-primary'])

export default {
  textHoverEnter,
  textHoverLeave
}
