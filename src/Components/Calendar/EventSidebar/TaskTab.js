import Axios from 'axios';
import React,{useState, useEffect} from 'react';
import styles from './EventSidebar.module.css';
import NewTask from './NewTask';
import TaskTable from './TaskTable';
import axios from 'axios';

const TaskTab = ({users, currentEventID, fetchData, notifySuccess}) => {
  const [newTask, setNewTask] = useState(false);
  const [endDateInput, setEndDateInput] = useState(new Date());
  const [dateError, setDateError] = useState('');
  const [endTimeInput, setEndTimeInput] = useState({hour: '5', minute: '00', period: 'PM'});
  const [timeError, setTimeError] = useState('');
  const [tasks, setTasks] = useState('');

  const deleteTask = async taskId => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}tasks?task_id=${taskId}`)
      fetchData();
      fetchTasks(currentEventID);
      notifySuccess('Deleted task', null, 2500);
    } catch(err) {
      console.log(err);
    }
  }

  const fetchTasks = async () => {
    try {
      const tasks = await axios.get(`${process.env.REACT_APP_API_URL}tasks_by_id?project_id=${currentEventID}`)
      console.log(tasks);
      setTasks(tasks.data);
    } catch(err) {
      console.log(err)
    }
  }

  const closeAndResetState = () => {
    setNewTask(false);
    setEndDateInput(new Date());
    setDateError('');
    setEndTimeInput('');
    setTimeError('');
    setTasks(null);
  }

  useEffect(() => {
    if(currentEventID) {
      fetchTasks();
    } else {
      closeAndResetState();
    }
  }, [currentEventID])

  return (
    <div className={`${styles.task_tab}`}>
      <button type="button" className={`${'button-primary center'}`} onClick={()=>setNewTask(!newTask)}>New Task</button>
      {
        newTask &&
        <NewTask
          endDateInput={endDateInput}
          setEndDateInput={setEndDateInput}
          setDateError={setDateError}
          endTimeInput={endTimeInput}
          setEndTimeInput={setEndTimeInput}
          setTimeError={setTimeError}
          users={users}
          currentEventID={currentEventID}
          fetchTasks={fetchTasks}
          fetchData={fetchData}
          notifySuccess={notifySuccess}

        />
      }
      <TaskTable
        tasks={tasks}
        deleteTask={deleteTask}
      />
    </div>
  )
}

export default TaskTab;