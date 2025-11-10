export const dateFormat = (dateString) => {
    const dateObject = new Date(dateString)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(dateObject);
    return formattedDate
}