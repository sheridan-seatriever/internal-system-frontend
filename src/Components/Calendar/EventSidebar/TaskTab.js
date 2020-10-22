import Axios from 'axios';
import React,{useState, useEffect} from 'react';
import styles from './EventSidebar.module.css';
import NewTask from './NewTask';
import TaskTable from './TaskTable';
import axios from 'axios';

const TaskTab = ({users, currentEventID}) => {
  const [newTask, setNewTask] = useState(false);
  const [endDateInput, setEndDateInput] = useState(new Date());
  const [dateError, setDateError] = useState('');
  const [endTimeInput, setEndTimeInput] = useState({hour: '5', minute: '00', period: 'PM'});
  const [timeError, setTimeError] = useState('');
  const [tasks, setTasks] = useState('');

  const fetchTasks = async () => {
    try {
      console.log('hello')
      const tasks = await axios.get(`${process.env.REACT_APP_API_URL}tasks?project_id=${currentEventID}`)
      setTasks(tasks.data);
      console.log(tasks);
    } catch(err) {
      console.log(err);
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
        />
      }
      <TaskTable
        tasks={tasks}
      />
    </div>
  )
}

export default TaskTab;