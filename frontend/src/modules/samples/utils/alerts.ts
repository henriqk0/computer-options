export function showSuccess(message: string) {
  console.log('[success]', message) // use a notification lib or similar at future
}

export function showError(message: string) {
  console.error('[error]', message)
}
