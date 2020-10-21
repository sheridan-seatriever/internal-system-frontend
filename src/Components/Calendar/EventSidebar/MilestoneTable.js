import React from 'react';
import styles from './EventSidebar.module.css';
import nextId from 'react-id-generator';
import loadingIcon from './loading.png';

const MilestoneTable = ({milestones, deleteMilestone}) => {

  const mapMilestones = milestones => {
    if(milestones) {
      return milestones.map(milestone=>{
        return (
          <div className={`${styles.milestone_container}`} key={nextId()}>
            <div>{milestone.milestone_title}</div>
            <div>{milestone.milestone_description}</div>
            <div>{milestone.milestone_end_date}</div>
            <div>{milestone.milestone_is_completed?'Completed':'Not completed'}</div>
            <button type="button" className={`${styles.delete} ${'center'}`} onClick={()=>deleteMilestone(milestone.milestone_id)}>DELETE
              {
                false &&
                <div className={styles.loading_icon_container}>
                  <img className="loading_icon" src={loadingIcon} />
                </div>
              }
            </button>
            <span/>
          </div>
        )
      })
    }
  }

  return (
    <div className={`${styles.milestone_table} ${'container both'}`}>
      {mapMilestones(milestones)}
      <span/>
    </div>
  )
}

export default MilestoneTable;