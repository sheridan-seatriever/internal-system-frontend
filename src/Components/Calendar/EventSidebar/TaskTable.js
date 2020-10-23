import React from 'react';
import styles from './EventSidebar.module.css';
import nextId from 'react-id-generator';

const TaskTable = ({tasks, deleteTask, users}) => {
  const mapTasks = () => {
    if(tasks&&tasks.length>0&&users&&users.length) {
      return tasks.map(task=>{
        const userName = (users.find(user=>user.user_id===task.task_assigned_to)).user_name;
        return (
          <tr key={nextId()}>
            <td className={`${styles.table_data}`}>{task.task_title}</td>
            <td className={`${styles.table_data} ${'no wrap'}`}>{userName}</td>
            <td className={`${styles.table_data} ${'no_wrap'}`}>{task.task_end_date}</td>
            <td>
              <button type="button" className={`${styles.ml_8} ${'center delete_small'}`} onClick={()=>deleteTask(task.task_id)}>DELETE
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
      {
        !(tasks&&tasks.length>0) &&
        <div className={styles.no_content}><span>No tasks</span></div>
      }
    </div>
  )
}

export default TaskTable;