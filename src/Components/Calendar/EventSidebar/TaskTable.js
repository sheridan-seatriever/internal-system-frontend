import React from 'react';
import styles from './EventSidebar.module.css';

const TaskTable = ({tasks, deleteTask}) => {

  const mapTasks = () => {
    if(tasks) {
      return tasks.map(task=>{
        return (
          <tr>
            <td className={`${styles.table_data} ${'width_max'}`}>{task.task_title}</td>
            <td className={`${styles.table_data}`}>{task.task_assigned_to}</td>
            <td className={`${styles.table_data} ${'no_wrap'}`}>{task.task_end_date}</td>
            <td>
              <button type="button" className={`${styles.ml_8} ${'center delete_small'}`} onClick={()=>deleteTask(task.task_id)}>DELETE
                {/* {
                  loadingDelete &&
                  <div className={styles.loading_icon_container}>
                    <img className="loading_icon" src={loadingIcon} />
                  </div>
                } */}
              </button>
            </td>
          </tr>
        )
      })
    }
  }

  return (
    <div className={`${styles.task_table} ${'container both'}`}>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Assigned to</th>
            <th>Deadline</th>
          </tr>
          {mapTasks()}
        </tbody>
      </table>
      <span />
    </div>
  )
}

export default TaskTable;