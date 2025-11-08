export { default as Toast } from './Toast'
export { default as ToastContainer } from './ToastContainer'
export { default as useToast } from '../../hooks/useToast'

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  LOADING: 'loading'
}

export const TOAST_POSITIONS = {
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  TOP_CENTER: 'top-center',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_CENTER: 'bottom-center'
}

export const TOAST_DURATIONS = {
  SHORT: 2000,
  NORMAL: 4000,
  LONG: 6000,
  INFINITE: 0
}