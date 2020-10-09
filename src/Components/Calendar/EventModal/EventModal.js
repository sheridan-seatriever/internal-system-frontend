import React,{useState, useEffect} from 'react';
import styles from './EventModal.module.css';
import moment from 'moment';
import axios from 'axios';
import nextId from "react-id-generator";
import Modal from '../../Modal';
import DatePicker from 'react-datepicker';
import TimePicker from '../../TimePicker/TimePicker';
import AddList from '../../AddList';
import {validateDates, validateAssignedTo, validateTime, validateTitle, validateAssignedToInput, validateMilestoneInput} from './validate';
import "react-datepicker/dist/react-datepicker.css";

function EventModal({children, users, closeModal, modalStartDate, setEvents, events, modalOpen, fetchUsersError}) {
  const [startDateInput, setStartDateInput] = useState(new Date());
  const [endDateInput, setEndDateInput] = useState(new Date());

  useEffect(() => {
    setStartDateInput(modalStartDate);
  }, [modalStartDate])

  const [assignedTo, setAssignedTo] = useState([]);
  const [assignedToError, setAssignedToError] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [milestoneError, setMilestoneError] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [dateError, setDateError] = useState('');
  const [startTimeInput, setStartTimeInput] = useState({hour: 9, minute: '00', period: 'AM'});
  const [endTimeInput, setEndTimeInput] = useState({hour: 5, minute: '00', period: 'PM'});
  const [timeError, setTimeError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const submit = async e => {
    e.preventDefault();
    if(validateSubmit()) {
      setLoadingSubmit(true);
      //disables DST conversion
        let offset = startDateInput.getTimezoneOffset();
        offset = Math.abs(offset / 60);
        startDateInput.setHours(startDateInput.getHours() + offset);
        offset = endDateInput.getTimezoneOffset();
        offset = Math.abs(offset / 60);
        endDateInput.setHours(endDateInput.getHours() + offset);
      //-----------------------
      const members = users.filter(user=>assignedTo.indexOf(user.user_name)!==-1);

      const event = {
        project_title: title,
        milestones,
        members,
        project_start_date: moment(startDateInput).format('YYYYMMDD'),
        project_end_date: moment(endDateInput).format('YYYYMMDD')
      }

      console.log(event)

      // try {
      //   const res = await axios.post('http://system.seatriever.com/wp-json/system-api/v1/create_studio_project', event);
      //   event.project_id = res.data;
      //   closeModalResetState();
      //   setEvents([...events, event]);
      // } catch {
      //   setSubmitError('Error, could not create project');
      // }
      setLoadingSubmit(false);
    }
  }

  const validateSubmit = () => {
    let valid = true;
    setTitleError('');
    setAssignedToError('');
    setDateError('');
    if(!validateTitle(title, setTitleError)) {
      valid = false;
    }
    if(!validateAssignedTo(assignedTo, setAssignedToError)) {
      valid = false;
    }
    if(!validateDates(startDateInput, endDateInput, setDateError)) {
      valid = false;
    }
    if(!validateTime(startTimeInput, setTimeError)) {
      valid = false;
    } else if(!validateTime(endTimeInput, setTimeError)) {
      valid = false;
    }
    return valid;
  }

  const closeModalResetState = () => {
    closeModal();
    setTitle('');
    setStartDateInput(new Date());
    setEndDateInput(new Date());
    setMilestones([]);
    setMilestoneError('');
    setAssignedTo([]);
    setAssignedToError('');
    setStartTimeInput({hour: 9, minute: '00', period: 'AM'})
    setEndTimeInput({hour: 5, minute: '00', period: 'PM'})
    setTitleError('');
    setDateError('');
    setSubmitError('');
  }

  return (
    <Modal callback={closeModalResetState} open={modalOpen}>
      {children}
      <h3 className={styles.modal_header}>Add new project</h3>
      <form onSubmit={e=>submit(e)} className={styles.inner}>
        <div className={styles.input_group}>
          <input value={title} onChange={e=>{
            setTitle(e.target.value);
            setTitleError('');
        }} placeholder="Enter the Project Title"></input>
          <div className={'error titleError'}>{titleError}</div>
        </div>
        <div className={styles.input_group}>
          <label className={styles.label}>Start:</label>
          <DatePicker selected={startDateInput} onChange={date=>{setStartDateInput(date); setDateError('')}}/>
          <label className={styles.time_label}>At:</label>
          <TimePicker time={startTimeInput} setTime={setStartTimeInput} onChange={()=>setTimeError('')}/>
        </div>
        <div className={styles.input_group}>
          <label className={styles.label}>End:&nbsp;&nbsp;</label>
          <DatePicker selected={endDateInput} onChange={date=>{setEndDateInput(date); setDateError('')}}/>
          <label className={styles.time_label}>At:</label>
          <TimePicker time={endTimeInput} setTime={setEndTimeInput} onChange={()=>setTimeError('')}/>
        </div>
        <div className="error">{dateError}</div>
        <div className="error">{timeError}</div>

        <div className={'acf-field acf-input top-space-10'}>
          <div className={'acf-label'}><label className={styles.label}>Assign To:</label></div>
          {
            !users&&!fetchUsersError?
            <div>loading</div>:
            <AddList data={users.map(user=>user.user_name)} selectedData={assignedTo} setSelectedData={setAssignedTo} validate={input=>validateAssignedToInput(input, setAssignedToError, users.map(user=>user.user_name))}/>
          }
        </div>
        <div className="error">{fetchUsersError}</div>
        <div className="error">{assignedToError}</div>
        <div className={'acf-field acf-input top-space-10'}>
          <div className={'acf-label'}><label className={styles.label}>Project Milestones</label></div>
          <AddList data={null} selectedData={milestones} setSelectedData={setMilestones} validate={input=>validateMilestoneInput(input, setMilestoneError)}/>
          <div className="error">{milestoneError}</div>
        </div>
        <div className={styles.button_group}>
          <button className={styles.button} type="submit">{loadingSubmit?'loading':'Submit'}</button>
          <button className={`${styles.button} ${styles.cancel_button}`} type="button" onClick={closeModalResetState}>Cancel</button>
        </div>
        <div className="error">{submitError}</div>
      </form>
    </Modal>
  )
}

export default EventModal;
