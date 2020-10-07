import React,{useState, useEffect} from 'react';
import styles from './EventSidebar.module.css';
import axios from 'axios';
import AddList from '../../AddList';
import SearchInput from '../../SearchInput';

const EventSidebar = ({open, users,fetchUsersError, loadingUsers, setEvents, currentEvent}) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [manager, setManager] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  
  useEffect(() => {
    if(currentEvent) {
      setTitle(currentEvent.project_title);
    }
  }, [currentEvent])

  const deleteProject = () => {
    //axios.
  }

  return (
    <div className={`${styles.container} ${open&&styles.open}`}>
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
              <SearchInput id="users_datalist" data={users} item_id={'user_id'} item_property={'user_name'}/>
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
        <div className={styles.input_group_inner}>
          <AddList selectedData={assignedTo} data={users} item_id={'user_id'} item_property={'user_name'}/>
        </div>
      }
      </div>
      <div className="error">{fetchUsersError}</div>
      <div className={styles.button_group}>
        <button type="button" className={`${styles.delete}`} onClick={deleteProject}>DELETE PROJECT</button>
      </div>
    </div>
  )
}

export default EventSidebar;