import React from 'react';
import styles from './Resource.module.css';

const ProjectDropdown = () => {
  return (
    <select>
      <option></option>
      <option value="Holiday">Holiday</option>
      <option value="Non working day">Non working day</option>
      <option value="Sick">Sick</option>
      <option value="Out of office">Out of office</option>
      <option value="Working from home">Working from home</option>
    </select>
  )
}

const gridBody = () => {
  return (
    <div className={styles.grid_body}>
      <div className={styles.grid_vertical_header}>
        <div className={styles.grid_name}>Name</div>
        <div className={styles.grid_am}>AM</div>
        <div className={styles.grid_pm}>PM</div>
      </div>
      <div className={styles.grid_split}>
        <ProjectDropdown />
        <ProjectDropdown />
      </div>
      <div className={styles.grid_split}>
        <ProjectDropdown />
        <ProjectDropdown />
      </div>
      <div className={styles.grid_split}>
        <ProjectDropdown />
        <ProjectDropdown />
      </div>
      <div className={styles.grid_split}>
        <ProjectDropdown />
        <ProjectDropdown />
      </div>
      <div className={styles.grid_split}>
        <ProjectDropdown />
        <ProjectDropdown />
      </div>
      <div className={styles.grid_split}>
        <ProjectDropdown />
        <ProjectDropdown />
      </div>
      <div className={styles.grid_split}>
        <ProjectDropdown />
        <ProjectDropdown />
      </div>
    </div>
  )
}

const Resources = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid_header}>
        <div></div>
        <div className={styles.grid_header_inner}>Monday</div>
        <div className={styles.grid_header_inner}>Tuesday</div>
        <div className={styles.grid_header_inner}>Wednesday</div>
        <div className={styles.grid_header_inner}>Thursday</div>
        <div className={styles.grid_header_inner}>Friday</div>
        <div className={styles.grid_header_inner}>Saturday</div>
        <div className={styles.grid_header_inner}>Sunday</div>
      </div>
      {gridBody()}
      {gridBody()}
      {gridBody()}
      {gridBody()}
    </div>
  )
}

export default Resources;