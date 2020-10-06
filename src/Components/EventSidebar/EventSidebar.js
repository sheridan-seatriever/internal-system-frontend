import React from 'react';
import styles from './EventSidebar.module.css';
import AddList from '../AddList';

const EventSidebar = ({open, loading, title, description, projectManager, assignedTo, users, deleteProject}) => {
  return (
    <div className={`${styles.container} ${open&&styles.open}`}>
      {loading?<div>loading</div>:<> 
        <div className={styles.input_group}>
          <label>Project Title</label>
          <input className={styles.input} value={title}/>
        </div>
        <div className={styles.input_group}>
          <label>Project Description</label>
          <textarea className={`${styles.input} ${styles.input_large}`} value={description}></textarea>
        </div>
        <div className={styles.input_group}>
          <label>Project Manager</label>
          <input className={styles.input} value={projectManager}/>
        </div>
        <AddList selectedData={assignedTo} data={users}/>
        <div className={styles.button_group}>
          <button type="button" className={`${styles.delete}`} onClick={deleteProject}>DELETE PROJECT</button>
        </div>
      </>}
    </div>
  )
}

export default EventSidebar;