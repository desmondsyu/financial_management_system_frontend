export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'en-US',
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

export function formatDate(dateStr: string | null | undefined) {
    if (!dateStr) {
        return "";
    }
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
        console.warn("Invalid date string:", dateStr);
        return "";
    }

    return date.toISOString().split("T")[0];
}