import {cloneDeep} from 'lodash';

const eventDataGenerator = (year, month, datesInEachweek, events) => {
  const eventRangeWeeks = [];

  datesInEachweek.map((week, index)=>{
    const eventDataWeek = [];
    let startRange = new Date(year, month, week[0]);
    let endRange = new Date(year, month, week[6]);
    if(index===0) {
      if(week[0]!==1) {
        startRange = new Date(year, month-1, week[0]);
      }
    }
    if(index===datesInEachweek.length-1) {
      if(week[6]<7) {
        endRange = new Date(year, month+1, week[6]);
      }
    }

    events.map(event=>{
      const startDate = new Date(event.project_start_date);
      const endDate = new Date(event.project_end_date);
      if(!(
        (startDate.getTime()<startRange.getTime()&&endDate.getTime()<startRange.getTime())||
        (startDate.getTime()>endRange.getTime()&&endDate.getTime()>endRange.getTime())
      )) {

        let newEvent = cloneDeep(event);
        
        newEvent.startInt = null;
        newEvent.endInt = null;
        if(startDate.getTime()<startRange.getTime()) {
          newEvent.startInt = 0;
        } else {
          newEvent.startInt = week.indexOf(startDate.getDate());
        }
        if(endDate.getTime()>endRange.getTime()) {
          newEvent.endInt = 7;
        } else {
          newEvent.endInt = week.indexOf(endDate.getDate()) + 1;
        }
        console.log('event: ', newEvent)
        eventDataWeek.push(newEvent);
      }
    })
    eventRangeWeeks.push(eventDataWeek);
  })
  return eventRangeWeeks;
}

export default eventDataGenerator;