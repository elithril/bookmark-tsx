export function convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    if (hours === 0 && minutes === 0) {
        return "il y a moins d'une minute"
    } else if (hours === 0 && minutes > 0) {
        return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
    } else {
        return `il y a ${hours} heure${hours > 1 ? 's' : ''} et ${minutes} minute${minutes > 1 ? 's' : ''}`
    }
}