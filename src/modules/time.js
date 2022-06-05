export function formatISOToRegular(ISOString) {
  const d = new Date(ISOString);

  let hours = d.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = d.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  let year = d.getFullYear();
  let date = d.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = d.getMonth();
  month++;
  if (month < 10) {
    month = `0${month}`;
  }

  return `${hours}:${minutes}:${seconds}  ${date}/${date}/${year}`;
}
