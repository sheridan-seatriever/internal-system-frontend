import React,{useState} from 'react';
import styles from './EventSidebar.module.css';
import TimePicker from '../../TimePicker';
import SearchInput from '../../SearchInput';
import DatePicker from 'react-datepicker';
import loadingIcon from './loading.png';
import axios from 'axios';
import moment from 'moment';

const submit = async (project_id, task_title, assignedTo, endDate, endTime, users) => {
  try {
    const task_end_date = moment(endDate).format('YYYY-MM-DD ' + endTime);
    let task_assigned_to = users.find(user=>user.user_name===assignedTo);
    task_assigned_to = task_assigned_to.user_id;
    const task = {
      project_id, 
      task_title,
      task_assigned_to,
      task_end_date
    }
    await axios.post(`${process.env.REACT_APP_API_URL}tasks`, task);
  } catch(err) {
    console.log(err);
  }
}

const NewTask = ({currentEventID, endDateInput, setEndDateInput, setDateError, endTimeInput, setEndTimeInput, setTimeError, users}) => {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedToError, setAssignedToError] = useState('');

  const handleClick = () => submit(currentEventID, title, assignedTo, endDateInput, endTimeInput, users);

  return (
    <div className={`${'container both max_width form_element'} ${styles.new_task}`}>
      <div className="max_width">
        <label>Task title:</label>
        <input placeholder="Task title" className={`${styles.max_width}`} value={title} onChange={e=>setTitle(e.target.value)}/>
      </div>
      <div className="form_element">
        <label>Assign to:</label>
        <SearchInput placeholder="Select user" data={users.map(user=>{return {name: user.user_name}})} input={assignedTo} setInput={setAssignedTo} setError={setAssignedToError}/>
      </div>
      <div className={`${styles.input_group} ${'form_element'}`}>
        <label className={styles.date_label}>Deadline:</label>
        <DatePicker selected={endDateInput} onChange={date=>{setEndDateInput(date); setDateError('')}}/>
        <label className={styles.time_label}>At:</label>
        <TimePicker time={endTimeInput} setTime={setEndTimeInput} onChange={()=>setTimeError('')}/>
      </div>
      <div className={styles.button_group}>
        <button type="button" className={`${'button-primary center'} ${styles.button_primary}`} onClick={handleClick}>SUBMIT MILESTONE 
          {
            false &&
            <div className={styles.loading_icon_container}>
              <img className="loading_icon" src={loadingIcon} />
            </div>
          }
        </button>
      </div>
      <span/>
    </div>
  )
}

export default NewTask;