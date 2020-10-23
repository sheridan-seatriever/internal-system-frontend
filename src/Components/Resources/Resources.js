import React from 'react';
import styles from './Resource.module.css';

const ProjectDropdown = () => {
  return (
    <select>
      <option>Holiday</option>
      <option>Non working day</option>
      <option>Sick</option>
      <option>Out of office</option>
      <option>Working from home</option>
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
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
        <div>Sunday</div>
      </div>
      {gridBody()}
      {gridBody()}
      {gridBody()}
      {gridBody()}
    </div>
  )
}

export default Resources;