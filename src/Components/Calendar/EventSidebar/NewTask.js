import React,{useState} from 'react';
import styles from './EventSidebar.module.css';
import TimePicker from '../../TimePicker';
import SearchInput from '../../SearchInput';
import DatePicker from 'react-datepicker';
import loadingIcon from './loading.png';
import axios from 'axios';
import moment from 'moment';
import to24Hour from '../../../Functions/to24Hour';
import {validateTitle, validateAssignedTo, validateDates, validateTime} from './validate';

const NewTask = ({currentEventID, endDateInput, setEndDateInput, setDateError, endTimeInput, setEndTimeInput, setTimeError, users, fetchTasks, fetchData, notifySuccess}) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignedToError, setAssignedToError] = useState('');

  const validateSubmit = () => {
    let valid = true;
    if(!validateTitle) valid = false;
    if(!validateAssignedTo) valid = false;
    if(!validateDates) valid = false;
    if(!validateTime) valid = false;
    return valid;
  }

  const submit = async () => {
    if(!validateSubmit) {
      try {
        const task_end_date = moment(endDateInput).format('YYYY-MM-DD ' + to24Hour(endTimeInput));
        let task_assigned_to = users.find(user=>user.user_name===assignedTo);
        task_assigned_to = task_assigned_to.user_id;
        const task = {
          project_id: currentEventID, 
          task_title: title,
          task_assigned_to,
          task_end_date
        }
        const res = await axios.post(`${process.env.REACT_APP_API_URL}tasks`, task);
        fetchData();
        fetchTasks(currentEventID);
        notifySuccess('Created task', null, 2500);
      } catch(err) {
        console.log(err);
      }
    }
}

  return (
    <div className={`${'container both max_width form_element'} ${styles.new_task}`}>
      <div className="max_width">
        <label>Task title:</label>
        <input placeholder="Task title" className={`${styles.max_width}`} value={title} onChange={e=>setTitle(e.target.value)}/>
      </div>
      <div className={'error titleError no_wrap'}>{titleError}</div>
      <div className="form_element">
        <label>Assign to:</label>
        <SearchInput placeholder="Select user" data={users.map(user=>{return {name: user.user_name}})} input={assignedTo} setInput={setAssignedTo} setError={setAssignedToError}/>
      </div>
      <div className={'error titleError no_wrap'}>{assignedToError}</div>
      <div className={`${styles.input_group} ${'form_element'}`}>
        <label className={styles.date_label}>Deadline:</label>
        <DatePicker selected={endDateInput} onChange={date=>{setEndDateInput(date); setDateError('')}}/>
        <label className={styles.time_label}>At:</label>
        <TimePicker time={endTimeInput} setTime={setEndTimeInput} onChange={()=>setTimeError('')}/>
      </div>
      <div className={styles.button_group}>
        <button type="button" className={`${'button-primary center'} ${styles.button_primary}`} onClick={submit}>SUBMIT TASK
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