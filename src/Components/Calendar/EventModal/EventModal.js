import React,{useState, useEffect} from 'react';
import styles from './EventModal.module.css';
import moment from 'moment';
import axios from 'axios';
import Modal from '../../Modal';
import DatePicker from 'react-datepicker';
import TimePicker from '../../TimePicker/TimePicker';
import AddList from '../../AddList';
import SearchInput from '../../SearchInput';
import {validateDates, validateAssignedTo, validateTime, validateTitle, validateAssignedToInput, validateMilestoneInput, validateProjectManager} from './validate';
import "react-datepicker/dist/react-datepicker.css";
import {cloneDeep} from 'lodash';
import to24Hour from './to24Hour';

function EventModal({children, users, closeModal, modalStartDate, setEvents, events, modalOpen, fetchUsersError}) {
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
  const [milestoneInput, setMilestoneInput] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [milestoneError, setMilestoneError] = useState('');
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
      let event = {
        project_title: title,
        project_manager: projectManager,
        project_start_date: moment(startDateInput).format('YYYY-MM-DD ' + start_time),
        project_end_date: moment(endDateInput).format('YYYY-MM-DD ' + end_time),
        project_description: description,
        project_assigned_to,
        project_milestones: milestones,
      }
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}projects`, event);
        event.project_id = res.data;
        let newEvents = cloneDeep(events);
        newEvents.push(event);
        setEvents(newEvents);
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
    setMilestoneInput('');
    setMilestones([]);
    setMilestoneError('');
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
      {children}
      <h3 className={styles.modal_header}>Add new project</h3>
      <form onSubmit={e=>submit(e)} className={styles.inner}>
        <div className={`${styles.input_group} ${'form_element'}`}>
          <input className={styles.input} value={title} onChange={e=>{
            setTitle(e.target.value);
            setTitleError('');
        }} placeholder="Enter the Project Title"></input>
          <div className={'error titleError no_wrap'}>{titleError}</div>
        </div>
        <div className={`${styles.input_group} ${'form_element'}`}>
          <SearchInput data={users.map(user=>user.user_name)} placeholder="Add project manager" input={projectManager} setInput={setProjectManager} setError={setProjectManagerError} />
          <div className={'error titleError no_wrap'}>{projectManagerError}</div>
        </div>
        <div className={`${styles.input_group} ${'form_element'}`}>
          <label className={styles.label}>Start:</label>
          <DatePicker selected={startDateInput} onChange={date=>{setStartDateInput(date); setDateError('')}}/>
          <label className={styles.time_label}>At:</label>
          <TimePicker time={startTimeInput} setTime={setStartTimeInput} onChange={()=>setTimeError('')}/>
        </div>
        <div className={`${styles.input_group} ${'form_element'}`}>
          <label className={styles.label}>End:&nbsp;&nbsp;</label>
          <DatePicker selected={endDateInput} onChange={date=>{setEndDateInput(date); setDateError('')}}/>
          <label className={styles.time_label}>At:</label>
          <TimePicker time={endTimeInput} setTime={setEndTimeInput} onChange={()=>setTimeError('')}/>
        </div>
        <div className="error">{dateError}</div>
        <div className="error">{timeError}</div>
        <div  className={'form_element label_group'}>
          <label className={styles.label}>Description:</label>
          <textarea className={styles.text_area} value={description} onChange={e=>setDescription(e.target.value)} />
          <div className={'error titleError no_wrap'}>{descriptionError}</div>
        </div>
        <div className={'form_element label_group'}>
        <label className={`${styles.label} ${'acf-label'}`}>Assign To:</label>
          {
            !users&&!fetchUsersError?
            <div>loading</div>:
            <>
              <AddList 
                data={users.map(user=>user.user_name)} 
                placeholder="Add user" 
                selectedData={assignedTo} 
                setSelectedData={setAssignedTo} 
                setError={setAssignedToError} 
                validate={input=>validateAssignedToInput(input, assignedTo, setAssignedToError, users)}
                input={assignedToInput}
                setInput={setAssignedToInput}
              />
            </>
          }
        </div>
        <div className="error">{fetchUsersError}</div>
        <div className="error">{assignedToError}</div>
        <div className={'form_element label_group'}>
        <label className={`${styles.label} ${'acf-label'}`}>Project Milestones:</label>
          <AddList 
            data={null}
            placeholder={"Add milestone"} 
            selectedData={milestones} 
            setSelectedData={setMilestones} 
            setError={setMilestoneError} 
            validate={input=>validateMilestoneInput(input, setMilestoneError)}
            input={milestoneInput}
            setInput={setMilestoneInput}
          />
        </div>
        <div className="error">{milestoneError}</div>
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
