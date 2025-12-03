export function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

export function formatExtensiveLongDate(dateString) {
    const date = new Date(dateString);
    const formatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(date);

    return formatted;
}

export function formatExtensiveShortDate(dateString) {
    const date = new Date(dateString);
    let formatted = new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);

    formatted = formatted.replace(/ de /g, ' ').replace(/\./g, '');

    return formatted;
}

export function formatNumber(num) {
    const number = Number(num); // converts to numeric

    if (isNaN(number)) return null; // to protect invalid numbers

    return number.toLocaleString('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}
