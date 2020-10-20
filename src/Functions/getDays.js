import moment from 'moment';

export const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 32).getDate();
  return 32-date;
}
export const getDaysInPrevMonth = (year, month) => {
  const date = new Date(year, month-1, 32).getDate();
  return 32 - date;
}
export const getFirstMonday = (year, month) => {
  let day = new Date(year, month, 1);
  day = moment(day);
  if(!(moment(day).format('dddd')==='Monday')) {
    day = new Date(year, (month-1), 1);
    day = moment(day).endOf('month').startOf('isoweek');
  }
  return day;
}