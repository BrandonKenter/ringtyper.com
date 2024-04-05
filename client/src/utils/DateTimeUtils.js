export const formatTime = (time) => {
  const milliseconds = ("00" + (time % 1000)).slice(-3);
  const seconds = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
  const minutes = ("0" + Math.floor((time / (1000 * 60)) % 60)).slice(-2);
  return `${minutes}:${seconds}.${milliseconds}`;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const getDateUTC = (date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const dateUTC = new Date(year, month, day);
  return dateUTC;
};
