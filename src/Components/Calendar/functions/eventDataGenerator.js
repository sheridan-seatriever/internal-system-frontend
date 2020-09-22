const eventDataGenerator = (year, month, dateRangeWeeks, events) => {
  console.log(dateRangeWeeks)
  const eventRangeWeeks = [];

  dateRangeWeeks.map((week, index)=>{
    const eventDataWeek = [];
    let startRange = new Date(year, month, week[0]);
    let endRange = new Date(year, month, week[6]);
    if(index===0) {
      if(week[0]!==1) {
        startRange = new Date(year, month-1, week[0]);
      }
    }
    if(index===dateRangeWeeks.length-1) {
      if(week[6]<7) {
        endRange = new Date(year, month+1, week[6]);
      }
    }

    events.map(event=>{
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      
      if(!(
        (startDate.getTime()<startRange.getTime()&&endDate.getTime()<startRange.getTime())||
        (startDate.getTime()>endRange.getTime()&&endDate.getTime()>endRange.getTime())
      )) {
        //add startInt and endInt

        let newEvent = {...event};
        
        newEvent.startInt = null;
        newEvent.endInt = null;
        console.log(week);
        console.log(startDate);
        console.log(endDate);
        if(startDate.getTime()<startRange.getTime()) {
          console.log(week + 'startInt less than start range')
          newEvent.startInt = 0;
        } else {
          newEvent.startInt = week.indexOf(startDate.getDate());
        }
        if(endDate.getTime()>endRange.getTime()) {
          console.log(week + 'endInt greater than end range')
          newEvent.endInt = 7;
        } else {
          newEvent.endInt = week.indexOf(endDate.getDate()+1);
        }
        eventDataWeek.push(newEvent);
      }
    })
    eventRangeWeeks.push(eventDataWeek);
  })
  console.log(eventRangeWeeks)
  return eventRangeWeeks;
}

export default eventDataGenerator;