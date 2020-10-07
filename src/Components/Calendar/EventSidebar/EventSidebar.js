import React from 'react';
import styles from './EventSidebar.module.css';
import axios from 'axios';
import AddList from '../../AddList';
import SearchInput from '../../SearchInput';


const EventSidebar = ({open, loading, title, description, projectManager, assignedTo, users, set, fetchUsersError, loadingUsers, setEvents}) => {


  const deleteProject = () => {
    //axios.
  }

  return (
    <div className={`${styles.container} ${open&&styles.open}`}>
      {loading?<div>loading</div>:<> 
        <div className={styles.input_group}>
          <label>Project Title</label>
          <div className={styles.input_group_inner}>
            <input className={styles.input} value={title} onChange={e=>set.setTitle(e.target.value)}/>
          </div>
        </div>
        <div className={styles.input_group}>
          <label>Project Description</label>
          <div className={styles.input_group_inner}>
            <textarea className={`${styles.input} ${styles.input_large}`} value={description} onChange={e=>set.setDescription(e.target.value)}></textarea>
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
      </>}
    </div>
  )
}

export default EventSidebar;