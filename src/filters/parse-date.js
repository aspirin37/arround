export default function parseDate(date, short) {
    if(date) return moment.unix(date).format(short ? 'DD MMM YYYY' : 'DD MMM YYYY в HH:mm');
    return 'Не определено';
}
