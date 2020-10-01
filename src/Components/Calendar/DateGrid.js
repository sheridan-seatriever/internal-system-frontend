import React,{useState,useEffect} from 'react';
import styles from '../../Styles/DateGrid.module.css';
import sampleData from './sampleData.js';
import axios from 'axios';
import eventDataGenerator from './functions/eventDataGenerator';
import eventTableGenerator from './functions/eventTableGenerator';
import containerTableGenerator from './functions/containerTableGenerator';
import moment from 'moment';
import nextId from "react-id-generator";
import _ from 'lodash';


function DateGrid({year, month}) {

  const [events, setEvents] = useState([]);

  const getDaysInMonth = () => {
    const date = new Date(year, month, 32).getDate();
    return 32-date;
  }
  const getDaysInPrevMonth = () => {
    const date = new Date(year, month-1, 32).getDate();
    return 32 - date;
  }
  const getFirstMonday = () => {
    let day = new Date(year, month, 1);
    day = moment(day);
    if(!(moment(day).format('dddd')==='Monday')) {
      day = new Date(year, (month-1), 1);
      day = moment(day).endOf('month').startOf('isoweek');
    }
    return day;
  }

  useEffect(() => {
    let daysInPrevMonth = getDaysInPrevMonth();
    let firstMonday = getFirstMonday();
    const daysInMonth = getDaysInMonth();
    const additionalDaysStart = (daysInPrevMonth-firstMonday.format('D'))+1;
    const rows = Math.ceil((additionalDaysStart+daysInMonth)/7);
    const totalDays = (rows*7);

    let startDate = firstMonday.toDate();
    //disables DST conversion
      let offset = startDate.getTimezoneOffset();
      offset = Math.abs(offset / 60);
      startDate.setHours(startDate.getHours() + offset);
    let endDate = firstMonday.add(totalDays, 'd').subtract(1,'seconds').toDate();
    //disables DST conversion
      offset = endDate.getTimezoneOffset();
      offset = Math.abs(offset / 60);
      endDate.setHours(endDate.getHours() + offset);
    startDate = moment(startDate).format('YYYYMMDD');
    endDate = moment(endDate).format('YYYYMMDD');

    //get dates starting from first monday and ending on last additional day
    const fetchData = async () => {
      const events = (await axios.get(`http://localhost:8080/testsite/wp-json/system-api/v1/studio_projects?startDate=${startDate}&endDate=${endDate}`)).data;
      setEvents(events);
    }
    fetchData()
  }, [year, month])


  let dateRange = [];
  let dayRange = [];

  let daysInPrevMonth = getDaysInPrevMonth();
  let firstMonday = getFirstMonday().format('D');
  const daysInMonth = getDaysInMonth();
  let rows = 0;
  if(firstMonday==='1') {
    rows = Math.ceil((daysInMonth)/7);
    dateRange = _.range(1, daysInMonth+1);
    dayRange = _.range(1, daysInMonth+1).map(day=><div key={nextId()} className={styles.day}></div>);
    // while(dayRange.length%rows!==0) {
    //   dayRange.push(<div key={nextId()} className={`${styles.day} ${styles.not_current_month}`}></div>);
    // }
  } else {
    const additional = (daysInPrevMonth-firstMonday)+1;
    rows = Math.ceil((additional+daysInMonth)/7);
    dateRange = _.range(firstMonday, daysInPrevMonth+1);
    dayRange = dateRange.map(day=><div key={nextId()} className={`${styles.day} ${styles.not_current_month}`}></div>);
    dateRange = dateRange.concat(_.range(1, daysInMonth+1));
    const currentDay = moment(new Date()).format('D');
    const currentMonth = moment(new Date()).format('M');
    dayRange = dayRange.concat(_.range(1, daysInMonth+1).map(day=>{
      if(day===currentDay&&month===currentMonth-1) {
        return <div key={nextId()} className={`${styles.day} ${styles.currentDay}`}></div>
      } else {
        return <div key={nextId()} className={styles.day}></div>
      }
    }));
  }

  let count = 1;
  while(dateRange.length%7!==0) {
    dateRange.push(count);
    count++;
  }

  while(dayRange.length%7!==0) {
    dayRange.push(<div key={nextId()} className={`${styles.day} ${styles.not_current_month}`}></div>);
  }

  const dateRangeWeeks = [];
  const dayRangeWeeks = []
  for(let i=0;i<rows;i++) {
    dateRangeWeeks.push(dateRange.splice(0,7));
    dayRangeWeeks.push(dayRange.splice(0,7));
  }

  let eventRangeWeeks = [];
  if(events.length>0) {
    eventRangeWeeks = eventDataGenerator(year, month, dateRangeWeeks, events);
  }

  let dateRows = [];
  for(let i=0;i<rows;i++) {
    // EVENT DATA GOES HERE
    const eventTable = eventTableGenerator(eventRangeWeeks[i]); //change to eventRangeWeeks in production
    dateRows.push(containerTableGenerator(eventTable, dateRangeWeeks[i], dayRangeWeeks[i]));
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