import { notify } from "@kyvg/vue3-notification"

export function showSuccess(message: string) {
  notify({
    title:'[success]',
    type: 'success',
    text: message
  })
}

export function showError(message: string) {
  notify({
    title:'[error]',
    type: 'error',
    text: message
  })
}
