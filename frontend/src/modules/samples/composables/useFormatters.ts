export function useFormatter() {
  function formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString + 'T00:00:00') // forces local time to toLocale not picks the past day in negative UTC
    return date.toLocaleDateString('pt-BR')
  }

  function formatExtensiveLongDate(dateString: string) {
    const date = new Date(dateString)
    const formatted = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date)

    return formatted
  }

  function formatExtensiveShortDate(dateString: string) {
    const date = new Date(dateString)
    let formatted = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date)

    formatted = formatted.replace(/ de /g, ' ').replace(/\./g, '')

    return formatted
  }

  function formatNumber(num: number) {
    const number = Number(num) // converts to numeric

    if (isNaN(number)) return null // to protect invalid numbers

    return number.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
  }

  return {
    formatPrice,
    formatDate,
    formatExtensiveLongDate,
    formatExtensiveShortDate,
    formatNumber,
  }
}
