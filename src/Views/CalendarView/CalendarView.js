import React, {useState, useEffect} from 'react';
import styles from './CalendarView.module.css';
import axios from 'axios';
import Calendar from '../../Components/Calendar';
import EventSidebar from '../../Components/Calendar/EventSidebar';
import EventModal from '../../Components/Calendar/EventModal';
import DateGrid from '../../Components/Calendar/DateGrid';

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStartDate, setModalStartDate] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [fetchUsersError, setFetchUsersError] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [currentEventID, setCurrentEventID] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const users = (await axios.get('http://system.seatriever.com/wp-json/system-api/v1/users_studio')).data;
      if(users&&Array.isArray(users)) {
        setUsers(users);
        setLoadingUsers(false);
      } else {
        setFetchUsersError('Error, could not find users');
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  }, [])

  const renderDateGrid = (year, month) => {
    return (
      <DateGrid 
        year={year} 
        month={month}
        setModalOpen={setModalOpen}
        setModalStartDate={setModalStartDate}
        setSidebarOpen={setSidebarOpen}
        events={events} 
        setEvents={setEvents} 
        setCurrentEventID={setCurrentEventID}
      />)}

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
        events={events} 
        setEvents={setEvents}/>
      <EventSidebar 
        open={sidebarOpen}
        users={users} 
        fetchUsersError={fetchUsersError} 
        loadingUsers={loadingUsers} 
        setEvents={setEvents}
        currentEvent={events.find(element=>element.project_id===currentEventID)}/>
      <Calendar 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen} 
        setModalStartDate={setModalStartDate} 
        renderDateGrid={(year, month) => renderDateGrid(year, month)} />
    </div>
  )
}

export default CalendarView;