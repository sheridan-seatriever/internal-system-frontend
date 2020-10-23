import React from 'react';
import styles from './EventSidebar.module.css';
import nextId from 'react-id-generator';
import loadingIcon from './loading.png';

const MilestoneTable = ({milestones, deleteMilestone}) => {

  const mapMilestones = milestones => {
    if(milestones) {
      return milestones.map(milestone=>{
        return (
          <tr key={nextId()}>
            <td className={`${styles.table_data} ${'no_wrap'}`}>{milestone.milestone_title}</td>
            <td className={`${styles.table_data} ${'width_max'}`}>{milestone.milestone_description}</td>
            <td className={`${styles.table_data} ${'no_wrap'}`}>{milestone.milestone_end_date}</td>
            <td className={`${styles.table_data}`}><input type="checkbox"/></td>
            <td className={`${styles.table_data}`}>
              <button type="button" className={`${'center delete_small'}`} onClick={()=>deleteMilestone(milestone.milestone_id)}>DELETE
                {
                  false &&
                  <div className={styles.loading_icon_container}>
                    <img className="loading_icon" src={loadingIcon} />
                  </div>
                }
              </button>
              <span/>
            </td>
          </tr>
        )
      })
    }
  }

  return (
    <div className={`${styles.milestone_table} ${'container both'}`}>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>✓</th>
          </tr>
          {mapMilestones(milestones)}
        </tbody>
      </table>
      <span/>
    </div>
  )
}

export default MilestoneTable;