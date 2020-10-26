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

const CalendarView = () => {
  const [sidebarTab, setSidebarTab] = useState('project');
  const [view, setView] = useState('calendar');
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStartDate, setModalStartDate] = useState();
  const [users, setUsers] = useState([]);
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
    let events = (await axios.get(`${process.env.REACT_APP_API_URL}projects_between?start_date=${startDate}&end_date=${endDate}`)).data;
    let milestones = (await axios.get(`${process.env.REACT_APP_API_URL}milestones`)).data;
    let tasks = (await axios.get(`${process.env.REACT_APP_API_URL}tasks`)).data;
    events = events.concat(milestones.concat(tasks)); 
    console.log(events)
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

  let render = 
    <Calendar 
      modalOpen={modalOpen} 
      setModalOpen={setModalOpen} 
      setModalStartDate={setModalStartDate} 
      year={year}
      month={month}
      setYear={setYear}
      setMonth={setMonth}
    >
      <DateGrid 
        year={year}
        month={month}
        setModalOpen={setModalOpen}
        setModalStartDate={setModalStartDate}
        events={events} 
        setEvents={setEvents} 
        setCurrentEventID={setCurrentEventID}
        sidebarTab={setSidebarTab}
        setSidebarTab={setSidebarTab}
      />
    </Calendar>
  switch(view) {
    case 'resource':
      render = <Resources />
    break;
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
          <button type="button" className={`${styles.button_primary} ${view==='resource'&&'active'}`} onClick={()=>setView('resource')}>Resource</button>
        </div>
        {render}
      </div>
    </div>
  )
}

export default CalendarView;