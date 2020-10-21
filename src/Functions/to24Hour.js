const to24Hour = time => {
  let hour = time.hour;
  let minute = time.minute;
  let period = time.period;

  let hourInt = parseInt(hour);
  if(hourInt===12) {
    hourInt = 0;
  }
  if(period==='PM') {
    hourInt+=12;
  }
  hour = hourInt.toString();

  if(hour.length<2) {
    hour = '0' + hour;
  }
  if(minute.length<2) {
    minute = '0' + minute;
  }

  return `${hour}:${minute}:00`;
}

export default to24Hour;