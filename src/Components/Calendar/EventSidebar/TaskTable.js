import React from 'react';
import styles from './EventSidebar.module.css';

const TaskTable = ({tasks}) => {

  const mapTasks = () => {
    if(tasks) {
      return tasks.map(task=>{
        return (
          <tr>
            <td className={`${styles.table_data}`}>{task.task_title}</td>
            <td className={`${styles.table_data}`}>{task.task_assigned_to}</td>
            <td className={`${styles.table_data}`}>{task.task_end_date}</td>
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