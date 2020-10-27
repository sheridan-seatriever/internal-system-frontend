import React, {useState, useEffect} from 'react';
import styles from './CalendarView.module.css';
import axios from 'axios';
import moment from 'moment';
import Calendar from '../../Components/Calendar';
import EventSidebar from '../../Components/Calendar/EventSidebar';
import EventModal from '../../Components/Calendar/EventModal';
import DateGrid from '../../Components/Calendar/DateGrid';
import Resources from '../../Components/Resources';
import {getDaysInPrevMonth, getDaysInMonth, getFirstMonday} from '../../Functions/getDays';
import _ from 'lodash';

const CalendarView = () => {
  const [sidebarTab, setSidebarTab] = useState('project');
  const [view, setView] = useState('resource');
  const [events, setEvents] = useState(null);
  const [projects, setProjects] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStartDate, setModalStartDate] = useState();
  const [users, setUsers] = useState(null);
  const [fetchUsersError, setFetchUsersError] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [currentEventID, setCurrentEventID] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const getCurrentMonth = () => {
    const date = new Date();
    return date.getMonth();
  }
  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  }
  
  const [month, setMonth] = useState(getCurrentMonth())
  const [year, setYear] = useState(getCurrentYear());

  useEffect(() => {
    if(modalOpen) {
      setCurrentEventID('');
    }
  }, [modalOpen])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = (await axios.get(`${process.env.REACT_APP_API_URL}users_all`)).data;
        setUsers(users);
      }
      catch(err) {
        setFetchUsersError('Error, could not find users');
      }
      setLoadingUsers(false);
    }
    fetchUsers();
  }, [])
  const fetchData = async (startDate, endDate) => {
    let projects = (await axios.get(`${process.env.REACT_APP_API_URL}projects_between?start_date=${startDate}&end_date=${endDate}`)).data;
    setProjects(projects);
    let milestones = (await axios.get(`${process.env.REACT_APP_API_URL}milestones`)).data;
    let tasks = (await axios.get(`${process.env.REACT_APP_API_URL}tasks`)).data;
    let events = tasks.concat(milestones.concat(projects)); 
    setEvents(events);
  }

  useEffect(() => {
    let daysInPrevMonth = getDaysInPrevMonth(year, month);
    let firstMonday = getFirstMonday(year, month);
    const daysInMonth = getDaysInMonth(year, month);
    const additionalDaysStart = (daysInPrevMonth-firstMonday.format('D'))+1;
    const rows = Math.ceil((additionalDaysStart+daysInMonth)/7);
    const totalDays = (rows*7);
    let startDate = firstMonday.toDate();
    //disables DST conversion
      let offset = startDate.getTimezoneOffset();
      offset = Math.abs(offset / 60);
      startDate.setHours(startDate.getHours() + offset);
    let endDate = firstMonday.add(totalDays, 'd').subtract(1,'seconds').toDate();
      offset = endDate.getTimezoneOffset();
      offset = Math.abs(offset / 60);
      endDate.setHours(endDate.getHours() + offset);
    //-----------------------
    startDate = moment(startDate).format('YYYYMMDD');
    endDate = moment(endDate).format('YYYYMMDD');
    setStartDate(startDate);
    setEndDate(endDate);
  }, [year, month])

  useEffect(() => {
    if(startDate, endDate) {
      fetchData(startDate, endDate);
    }
  }, [startDate, endDate])


   //dateRange is an array which contains the dates which will be displayed for the selected month
  let dateRange = [];

  let daysInPrevMonth = getDaysInPrevMonth(year, month);
  let firstMonday = getFirstMonday(year, month).format('D');
  const daysInMonth = getDaysInMonth(year, month);
  let rows = 0;
  if(firstMonday==='1') {
    rows = Math.ceil((daysInMonth)/7);
    dateRange = _.range(1, daysInMonth+1);
  } else {
    //push dates in previous month to start of dategrid
    const additional = (daysInPrevMonth-firstMonday)+1;
    rows = Math.ceil((additional+daysInMonth)/7);
    dateRange = _.range(firstMonday, daysInPrevMonth+1);
    dateRange = dateRange.concat(_.range(1, daysInMonth+1));
  }
  //push dates from next month to end of dategrid
  let count = 1;
  while(dateRange.length%7!==0) {
    dateRange.push(count);
    count++;
  }

  //datesInEachWeek splits dateRange into one array for each week
  const datesInEachWeek = [];
  for(let i=0;i<rows;i++) {
    datesInEachWeek.push(dateRange.splice(0,7));
  }


  return(
    <div className={styles.container}>
      <EventModal 
        closeModal={()=>{setModalOpen(false)}} 
        modalOpen={modalOpen} 
        modalStartDate={modalStartDate} 
        users={users} 
        setModalStartDate={setModalStartDate} 
        fetchUsersError={fetchUsersError} 
        loadingUsers={loadingUsers} 
        fetchData={()=>fetchData(startDate, endDate)}
      />
      <EventSidebar 
        currentEventID={currentEventID}
        setCurrentEventID={setCurrentEventID}
        users={users} 
        fetchUsersError={fetchUsersError} 
        loadingUsers={loadingUsers}
        fetchData={()=>fetchData(startDate, endDate)}
        sidebarTab={sidebarTab}
        setSidebarTab={setSidebarTab}
      />
      <div className="width_max">
        <div className={`${styles.button_group} ${styles.mb_30}`}>
          <button type="button" className={`${styles.button_primary} ${view==='calendar'&&'active'}`} onClick={()=>setView('calendar')}>Calendar</button>
          <button type="button" className={`${styles.button_primary} ${view==='resource'&&'active'}`} onClick={()=>{setView('resource'); setCurrentEventID('')}}>Resource</button>
        </div>
        <Calendar 
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen} 
          setModalStartDate={setModalStartDate} 
          year={year}
          month={month}
          setYear={setYear}
          setMonth={setMonth}
          view={view}
          resources={<Resources
            users={users}
            projects={projects}
            datesInEachWeek={datesInEachWeek}
          />}
          calendar={<DateGrid 
            year={year}
            month={month}
            setModalOpen={setModalOpen}
            setModalStartDate={setModalStartDate}
            events={events} 
            setEvents={setEvents} 
            setCurrentEventID={setCurrentEventID}
            sidebarTab={setSidebarTab}
            setSidebarTab={setSidebarTab}
          />}
        />
      </div>
    </div>
  )
}

export default CalendarView;