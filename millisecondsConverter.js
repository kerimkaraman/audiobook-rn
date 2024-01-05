export function convertMillisecondsToTime(ms) {
  // 1 saniye = 1000 milisaniye
  // 1 dakika = 60 saniye
  // 1 saat = 60 dakika
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  // Zamanı iki haneli sayılara dönüştür
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedHours = hours < 10 ? `0${hours}` : hours;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
