import React,{useEffect} from 'react';
import styles from './DateGrid.module.css';
import eventDataGenerator from './functions/eventDataGenerator';
import generateEventPositions from './functions/generateEventPositions';
import containerTableGenerator from './functions/containerTableGenerator';
import moment from 'moment';
import _ from 'lodash';
import Day from './Day';
import nextId from 'react-id-generator';
import {getDaysInPrevMonth, getDaysInMonth, getFirstMonday} from '../../../Functions/getDays';

const DateGrid = ({year, month, setModalStartDate, setModalOpen, events, setCurrentEventID, setSidebarTab}) => {

  //dateRange is an array which contains the dates which will be displayed for the selected month
  let dateRange = [];
  //dayRange returns a Day component for each day in dateRange
  let dayRange = [];

  let daysInPrevMonth = getDaysInPrevMonth(year, month);
  let firstMonday = getFirstMonday(year, month).format('D');
  const daysInMonth = getDaysInMonth(year, month);
  let rows = 0;
  if(firstMonday==='1') {
    rows = Math.ceil((daysInMonth)/7);
    dateRange = _.range(1, daysInMonth+1);
    dayRange = dateRange.map(day=><Day currentDay={false} notCurrentMonth={false} onClick={()=>{setModalOpen(true);setModalStartDate(new Date(year, month, day))}}/>);
  } else {
    //push dates in previous month to start of dategrid
    const additional = (daysInPrevMonth-firstMonday)+1;
    rows = Math.ceil((additional+daysInMonth)/7);
    dateRange = _.range(firstMonday, daysInPrevMonth+1);
    dayRange = dateRange.map(day=><Day currentDay={false} key={nextId()} notCurrentMonth={true} onClick={()=>{setModalOpen(true);setModalStartDate(new Date(year, month, day))}}/>);
    dateRange = dateRange.concat(_.range(1, daysInMonth+1));
    const currentDay = moment(new Date()).format('D');
    const currentMonth = moment(new Date()).format('M');
    dayRange = dayRange.concat(_.range(1, daysInMonth+1).map(day=>{
      if(day===currentDay&&month===currentMonth-1) {
        return <Day key={nextId()} currentDay={true} notCurrentMonth={false} onClick={()=>{setModalOpen(true);setModalStartDate(new Date(year, month, day))}}/>;
      } else {
        return <Day key={nextId()} currentDay={false} notCurrentMonth={false} onClick={()=>{setModalOpen(true);setModalStartDate(new Date(year, month, day))}}/>;
      }
    }));
  }
  //push dates from next month to end of dategrid
  let count = 1;
  while(dateRange.length%7!==0) {
    dateRange.push(count);
    count++;
  }
  while(dayRange.length%7!==0) {
    dayRange.push(<Day currentDay={false} notCurrentMonth={true} key={nextId()} onClick={()=>{setModalOpen(true);setModalStartDate(new Date(year, month))}}/>);
  }

  //datesInEachWeek splits dateRange into one array for each week
  const datesInEachWeek = [];
  const dayRangeWeeks = [];
  for(let i=0;i<rows;i++) {
    datesInEachWeek.push(dateRange.splice(0,7));
    dayRangeWeeks.push(dayRange.splice(0,7));
  }

  //eventRangeWeeks splits events into weeks and adds startInt and endInt to each event
  let eventRangeWeeks = [];
  if(events&&events.length>0) {
    eventRangeWeeks = eventDataGenerator(year, month, datesInEachWeek, events);
  }

  let dateRows = [];
  for(let i=0;i<rows;i++) {
    const eventTable = generateEventPositions(eventRangeWeeks[i]);
    dateRows.push(containerTableGenerator(eventTable, datesInEachWeek[i], dayRangeWeeks[i], setCurrentEventID, setSidebarTab));
  }

  return(
    <table className={styles.table_main}>
      <thead>
        <tr>
          <th className={styles.day_header}>Monday</th>
          <th className={styles.day_header}>Tuesday</th>
          <th className={styles.day_header}>Wednesday</th>
          <th className={styles.day_header}>Thursday</th>
          <th className={styles.day_header}>Friday</th>
          <th className={styles.day_header}>Saturday</th>
          <th className={styles.day_header}>Sunday</th>
        </tr>
      </thead>
      <tbody>
        {dateRows}
      </tbody>
    </table>
  )
}

export default DateGrid;