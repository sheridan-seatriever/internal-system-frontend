import React,{useState, useEffect} from 'react';
import styles from './EventSidebar.module.css';
import axios from 'axios';
import AddList from '../../AddList';
import SearchInput from '../../SearchInput';
import {cloneDeep} from 'lodash';

const EventSidebar = ({currentEventID, setCurrentEventID, users, fetchUsersError, loadingUsers, events, setEvents, currentEvent}) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [manager, setManager] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(currentEvent) {
      setTitle(currentEvent.project_title);
    } else {
      setTitle('');
    }
  }, [currentEventID])

  const deleteProject = async () => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}projects?project_id=${currentEvent.project_id}`);
      let updatedEvents = cloneDeep(events);
      updatedEvents = updatedEvents.filter(event=>event.project_id!==currentEventID);
      setEvents(updatedEvents);
      setCurrentEventID('');
    } catch(err) {
      setError('Error, could not delete event');
    }
    setLoading(false);
  }

  return (
    <>
      <div className={`${styles.buffer} ${currentEventID&&styles.open}`}></div>
      <div className={`${styles.container} ${currentEventID&&styles.open}`}>
        <div className={styles.button_group}>
          <button type="button" className={`${styles.cancel}`} onClick={()=>setCurrentEventID('')}>CANCEL</button>
        </div>
        <div className={'form_element label_group'}>
          <label>Project Title:</label>
          <input className={styles.input} value={title} onChange={e=>setTitle(e.target.value)}/>
        </div>
        <div className={'form_element label_group'}>
          <label>Project Description:</label>
          <textarea className={`${styles.input} ${styles.input_large}`} value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <div className={'form_element label_group'}>
          <label>Project Manager:</label>
          {loadingUsers?
            <div>loading</div>:
            <SearchInput data={users} placeholder="Add users"/>
          }
        </div>
        <div className="error">{fetchUsersError}</div>
        <div className={'form_element label_group'}>
        <label>Assigned To:</label>
        {
          loadingUsers? 
          <div>loading</div>:
          <AddList data={users.map(user=>user.user_name)} selectedData={assignedTo} setSelectedData={setAssignedTo}/>
        }
        </div>
        <div className="error">{fetchUsersError}</div>
        <div className={styles.button_group}>
          <button type="button" className={`${styles.delete}`} onClick={deleteProject}>DELETE PROJECT</button>
          <button type="button" className={`${'button-primary'} ${styles.button_primary}`} onClick={deleteProject}>UPDATE PROJECT</button>
        </div>
      </div>
    </>
  )
}

export default EventSidebar;