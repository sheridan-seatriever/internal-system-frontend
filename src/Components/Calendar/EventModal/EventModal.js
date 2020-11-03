import React,{useState, useEffect} from 'react';
import styles from './EventModal.module.css';
import moment from 'moment';
import axios from 'axios';
import Modal from '../../Modal';
import DatePicker from 'react-datepicker';
import TimePicker from '../../TimePicker/TimePicker';
import AddList from '../../AddList';
import SearchInput from '../../SearchInput';
import {validateDates, validateAssignedTo, validateTime, validateTitle, validateAssignedToInput, validateProjectManager} from './validate';
import "react-datepicker/dist/react-datepicker.css";
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import to24Hour from '../../../Functions/to24Hour';
import loadingIcon from './loading.png';

function EventModal({children, users, closeModal, modalStartDate, modalOpen, fetchUsersError, fetchData}) {
  const [startDateInput, setStartDateInput] = useState(new Date());
  const [endDateInput, setEndDateInput] = useState(new Date());

  useEffect(() => {
    setStartDateInput(modalStartDate);
    setEndDateInput(modalStartDate);
  }, [modalStartDate])

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [projectManager, setProjectManager] = useState('');
  const [projectManagerError, setProjectManagerError] = useState('');
  const [dateError, setDateError] = useState('');
  const [startTimeInput, setStartTimeInput] = useState({hour: '9', minute: '00', period: 'AM'});
  const [endTimeInput, setEndTimeInput] = useState({hour: '5', minute: '00', period: 'PM'});
  const [timeError, setTimeError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [assignedToInput, setAssignedToInput] = useState('');
  const [assignedTo, setAssignedTo] = useState([]);
  const [assignedToError, setAssignedToError] = useState('');
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
      const project_assigned_to = users.filter(user=>assignedTo.indexOf(user.user_name)!==-1);
      const start_time = to24Hour(startTimeInput);
      const end_time = to24Hour(endTimeInput);
      const project_manager = users.find(user=>user.user_name===projectManager);
      let event = {
        project_title: title,
        project_manager,
        project_start_date: moment(startDateInput).format('YYYY-MM-DD ' + start_time),
        project_end_date: moment(endDateInput).format('YYYY-MM-DD ' + end_time),
        project_description: description,
        project_assigned_to
      }
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}projects`, event);
        fetchData();
        NotificationManager.success('Created new project', null, 2500);
        closeModalResetState();
      } catch {
        setSubmitError('Error, could not create project');
      }
      setLoadingSubmit(false);
    }
  }

  const validateSubmit = () => {
    let valid = true;
    if(!validateTitle(title, setTitleError)) valid = false;
    if(!validateProjectManager(projectManager, setProjectManagerError, users)) valid = false;
    if(!validateAssignedTo(assignedTo, setAssignedToError)) valid = false;
    const startDate = new Date(moment(startDateInput).format('YYYY-MM-DD ' + to24Hour(startTimeInput)));
    const endDate = new Date(moment(endDateInput).format('YYYY-MM-DD ' + to24Hour(endTimeInput)));
    if(!validateDates(startDate, endDate, setDateError)) valid = false;
    if(!validateTime(startTimeInput, setTimeError)) valid = false; 
    if(!validateTime(endTimeInput, setTimeError)) valid = false;
    return valid;
  }

  const closeModalResetState = () => {
    closeModal();
    setTitle('');
    setTitleError('');
    setProjectManager('');
    setProjectManagerError('');
    setStartDateInput(new Date());
    setEndDateInput(new Date());
    setDateError('');
    setDescription('');
    setDescriptionError('');
    setAssignedToInput('');
    setAssignedTo([]);
    setAssignedToError('');
    setStartTimeInput({hour: 9, minute: '00', period: 'AM'})
    setEndTimeInput({hour: 5, minute: '00', period: 'PM'})
    setTimeError('');
    setSubmitError('');
  }

  return (
    <Modal callback={closeModalResetState} open={modalOpen}>
      <div className={styles.modal_container}>
        <h3 className={styles.modal_header}>Add new project</h3>
        <form onSubmit={e=>submit(e)} className={styles.inner}>
          <div className={`${styles.input_group} ${'form_element'}`}>
            <input className={styles.input} value={title} onChange={e=>{
              setTitleError('');
              setTitle(e.target.value);
            }} placeholder="Enter the Project Title"></input>
            <div className={'error titleError no_wrap'}>{titleError}</div>
          </div>
          <div className={`${styles.input_group} ${'form_element'}`}>
            <div className={styles.input}>
              <SearchInput data={users&&users.map(user=>({name: user.user_name, id: user.user_id}))} input={projectManager} setInput={setProjectManager} placeholder="Select a project manager" setError={setProjectManagerError}/>
            </div>
            <div className={'error titleError no_wrap'}>{projectManagerError}</div>
          </div>
          <div className={`${styles.input_group} ${'form_element'}`}>
            <label className={styles.date_label}>Start:</label>
            <DatePicker selected={startDateInput} onChange={date=>{setStartDateInput(date); setDateError('')}}/>
            <label className={styles.time_label}>At:</label>
            <TimePicker time={startTimeInput} setTime={setStartTimeInput} onChange={()=>setTimeError('')}/>
          </div>
          <div className={`${styles.input_group} ${'form_element'}`}>
            <label className={styles.date_label}>End:</label>
            <DatePicker selected={endDateInput} onChange={date=>{setEndDateInput(date); setDateError('')}}/>
            <label className={styles.time_label}>At:</label>
            <TimePicker time={endTimeInput} setTime={setEndTimeInput} onChange={()=>setTimeError('')}/>
          </div>
          <div className="error">{dateError}</div>
          <div className="error">{timeError}</div>
          <div  className={'form_element label_group'}>
            <label className='label_group_label'>Description:</label>
            <textarea className={`${'label_group_content'}`} value={description} onChange={e=>setDescription(e.target.value)} />
            <div className={'error titleError no_wrap'}>{descriptionError}</div>
          </div>
          <div className={'form_element label_group'}>
          <label className='acf-label label_group_label'>Assign To:</label>
            {
              !users&&!fetchUsersError?
              <div>loading</div>:
              <div className='label_group_content'>
                <AddList 
                  data={users.map(user=>({name: user.user_name, id: user.user_id}))} 
                  placeholder="Add user" 
                  selectedData={assignedTo} 
                  setSelectedData={setAssignedTo} 
                  setError={setAssignedToError} 
                  validate={input=>validateAssignedToInput(input, assignedTo, setAssignedToError, users)}
                  input={assignedToInput}
                  setInput={setAssignedToInput}
                />
              </div>
            }
          </div>
          <div className="error">{fetchUsersError}</div>
          <div className="error">{assignedToError}</div>
          <div className={styles.button_group}>
            <button className={`${styles.button} ${styles.cancel_button}`} type="button" onClick={closeModalResetState}>Cancel</button>
            <button className={`${styles.button} ${'center'}`} type="submit">Submit 
              {
                loadingSubmit &&
                <div className={styles.loading_icon_container}>
                  <img className="loading_icon" src={loadingIcon} />
                </div>
              }</button>
          </div>
          <div className="error">{submitError}</div>
        </form>
      </div>
    </Modal>
  )
}

export default EventModal;
