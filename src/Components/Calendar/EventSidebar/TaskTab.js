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
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const deleteTask = async taskId => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}tasks?task_id=${taskId}`)
      fetchData();
      fetchTasks(currentEventID);
    } catch(err) {
      console.log(err);
    }
  }

  const fetchTasks = async () => {
    try {
      const tasks = await axios.get(`${process.env.REACT_APP_API_URL}tasks_by_id?project_id=${currentEventID}`)
      setTasks(tasks.data);
    } catch(err) {
      console.log(err)
    }
  }

  const resetState = () => {
    console.log('reset');
    setEndDateInput(new Date());
    setDateError('');
    setEndTimeInput({hour: '5', minute: '00', period: 'PM'});
    setTimeError('');
    setTasks(null);
    setTitle('');
    setAssignedTo('');
  }

  useEffect(() => {
    if(currentEventID) {
      fetchTasks();
    } else {
      resetState();
      setNewTask(false);
    }
  }, [currentEventID])

  return (
    <div className={`${styles.task_tab}`}>
      <button type="button" className={`${'button-primary center'}`} onClick={()=>setNewTask(!newTask)}>New Task</button>
      {
        newTask &&
        <NewTask
          endDateInput={endDateInput} setEndDateInput={setEndDateInput}
          dateError={dateError} setDateError={setDateError}
          endTimeInput={endTimeInput} setEndTimeInput={setEndTimeInput}
          timeError={timeError} setTimeError={setTimeError}
          title={title} setTitle={setTitle}
          assignedTo={assignedTo} setAssignedTo={setAssignedTo}
          users={users}
          currentEventID={currentEventID}
          fetchTasks={fetchTasks}
          fetchData={fetchData}
          notifySuccess={notifySuccess}
          resetState={resetState}
        />
      }
      <TaskTable
        tasks={tasks}
        deleteTask={deleteTask}
        users={users}
      />
    </div>
  )
}

export default TaskTab;