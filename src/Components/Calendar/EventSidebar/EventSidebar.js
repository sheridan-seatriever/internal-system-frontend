import React,{useState, useEffect} from 'react';
import styles from './EventSidebar.module.css';
import axios from 'axios';
import AddList from '../../AddList';
import SearchInput from '../../SearchInput';

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
      await axios.delete(`http://system.seatriever.com/wp-json/system-api/v1/delete_studio_project?project_id=${currentEvent.project_id}`);
      let updatedEvents = [...events];
      updatedEvents.splice(events.indexOf(currentEvent));
      setEvents(updatedEvents);
      setCurrentEventID('');
    } catch(err) {
      setError('Error, could not delete event');
    }
    setLoading(false);
  }

  return (
    <div className={`${styles.container} ${currentEventID&&styles.open}`}>
      <div className={styles.input_group}>
        <label>Project Title</label>
        <div className={styles.input_group_inner}>
          <input className={styles.input} value={title} onChange={e=>setTitle(e.target.value)}/>
        </div>
      </div>
      <div className={styles.input_group}>
        <label>Project Description</label>
        <div className={styles.input_group_inner}>
          <textarea className={`${styles.input} ${styles.input_large}`} value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
      </div>
      <div className={styles.input_group}>
        <label>Project Manager</label>
        {loadingUsers?
          <div>loading</div>:
          <>
            <div className={styles.input_group_inner}>
              <SearchInput data={users} placeholder="Add users"/>
            </div>
          </>
        }
      </div>
      <div className="error">{fetchUsersError}</div>
      <div className={styles.input_group}>
      <label>Assigned To</label>
      {
        loadingUsers? 
        <div>loading</div>:
        <div className={`${'acf-field acf-input'} ${styles.input_group_inner}`}>
          <AddList data={users.map(user=>user.user_name)} selectedData={assignedTo} setSelectedData={setAssignedTo}/>
        </div>
      }
      </div>
      <div className="error">{fetchUsersError}</div>
      <div className={styles.button_group}>
        <button type="button" className={`${styles.cancel}`} onClick={()=>setCurrentEventID('')}>CANCEL</button>
        <button type="button" className={`${styles.delete}`} onClick={deleteProject}>DELETE PROJECT</button>
      </div>
    </div>
  )
}

export default EventSidebar;