import React, {useState, useEffect} from 'react';
import styles from './CalendarView.module.css';
import axios from 'axios';
import Calendar from '../../Components/Calendar';
import EventSidebar from '../../Components/Calendar/EventSidebar';
import EventModal from '../../Components/Calendar/EventModal';

const CalendarView = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStartDate, setModalStartDate] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectMangager, setProjectMangager] = useState('');
  const [assignedTo, setAssignedTo] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetchUsersError, setFetchUsersError] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(true);

  const set = {
    setSidebarOpen,
    setTitle,
    setDescription,
    setProjectMangager,
    setAssignedTo,
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get('http://system.seatriever.com/wp-json/system-api/v1/users_studio');
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

  return(
    <div className={styles.container}>
      <EventModal closeModal={()=>{setModalOpen(false)}} modalOpen={modalOpen} modalStartDate={modalStartDate} users={users} setModalStartDate={setModalStartDate} fetchUsersError={fetchUsersError} loadingUsers={loadingUsers}/>
      <EventSidebar open={sidebarOpen} title={title} description={description} projectMangager={projectMangager} assignedTo={assignedTo} users={users} set={set} fetchUsersError={fetchUsersError} loadingUsers={loadingUsers}/>
      <Calendar  modalOpen={modalOpen} setModalOpen={setModalOpen} setModalStartDate={setModalStartDate}/>
      <button onClick={()=>setSidebarOpen(!sidebarOpen)}>open</button>
    </div>
  )
}

export default CalendarView;