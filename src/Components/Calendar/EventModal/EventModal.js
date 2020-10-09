import React,{useState, useEffect} from 'react';
import styles from './EventModal.module.css';
import moment from 'moment';
import axios from 'axios';
import nextId from "react-id-generator";
import Modal from '../../Modal';
import DatePicker from 'react-datepicker';
import TimePicker from '../../TimePicker/TimePicker';
import AddList from '../../AddList';
import {validateDates, validateMilestone, validateTeamMembers, validateTime, validateTitle} from './validate';
import "react-datepicker/dist/react-datepicker.css";

function EventModal({children, users, closeModal, modalStartDate, setEvents, events, modalOpen, fetchUsersError}) {
  const [assignedTo, setAssignedTo] = useState([]);
  const [startDateInput, setStartDateInput] = useState(new Date());
  const [endDateInput, setEndDateInput] = useState(new Date());

  useEffect(() => {
    setAssignedTo(users);
  }, [users]);

  useEffect(() => {
    setStartDateInput(modalStartDate);
  }, [modalStartDate])

  const [teamMembers, setTeamMembers] = useState([]);
  const [teamMembersError, setTeamMembersError] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [milestoneInput, setMilestoneInput] = useState('');
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
      const event = {
        project_title: title,
        milestones,
        members: teamMembers,
        project_start_date: moment(startDateInput).format('YYYYMMDD'),
        project_end_date: moment(endDateInput).format('YYYYMMDD')
      }

      try {
        const res = await axios.post('http://system.seatriever.com/wp-json/system-api/v1/create_studio_project', event);
        event.project_id = res.data;
        closeModalResetState();
        setEvents([...events, event]);
      } catch {
        setSubmitError('Error, could not create project');
      }
      setLoadingSubmit(false);
    }
  }

  //validation
  const validateSubmit = () => {
    let valid = true;
    setTitleError('');
    setTeamMembersError('');
    setDateError('');
    if(!validateTitle(title, setTitleError)) {
      valid = false;
    }
    if(!validateTeamMembers(teamMembers, setTeamMembersError)) {
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

  //functions
  const closeModalResetState = () => {
    closeModal();
    setTitle('');
    setStartDateInput(new Date());
    setEndDateInput(new Date());
    setMilestoneInput('');
    setMilestones([]);
    setTeamMembers([]);
    setAssignedTo(users);
    setStartTimeInput({hour: 9, minute: '00', period: 'AM'})
    setEndTimeInput({hour: 5, minute: '00', period: 'PM'})
    setTitleError('');
    setTeamMembersError('');
    setMilestoneError('');
    setDateError('');
    setSubmitError('');
  }

  const mapassignedTo = () => {
    if(assignedTo) {
      return assignedTo.map(user=>{
        return (
          <div key={nextId()} className={styles.user_container}>
            <div className={styles.user}>{user.user_name}</div>
            <button className={styles.button + ' add'} type="button" onClick={()=>{
              setTeamMembersError('');
              setTeamMembers([...teamMembers, user]);
              const index = assignedTo.indexOf(user);
              console.log(index)
              setAssignedTo([...assignedTo.slice(0,index), ...assignedTo.slice(index+1,assignedTo.length)]);
          }}>+</button>
          </div>
        )
      })
    }
  }

  const mapTeamMembers = () => {
    if(teamMembers) {
      return teamMembers.map(member=>{
        return (
          <div key={nextId()} className={styles.user_container}>
            <div className={styles.user}>{member.user_name}</div>
            <button className={styles.button + ' remove'} type="button" onClick={()=>{
              setAssignedTo([...assignedTo, member]);
              const index = teamMembers.indexOf(member);
              setTeamMembers([...teamMembers.slice(0,index), ...teamMembers.slice(index+1, teamMembers.length)])
          }}>&#10005;</button>
          </div>
        )
      })
    }
  }

    const mapMilestones = () => {
    if(milestones) {
      return milestones.map(milestone=>{
        return (
          <div key={nextId()} className={styles.user_container}>
            <div className={styles.user}>{milestone}</div>
            <button className={styles.button + ' remove'} type="button" onClick={()=>{
              const index = milestones.indexOf(milestone);
              setMilestones([...milestones.slice(0,index), ...milestones.slice(index+1, milestones.length)]);
          }}>&#10005;</button>
          </div>
        )
      })
    }
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
            <AddList data={users} selectedData={['hello', 'hello', 'hello']} setSelectedData={setAssignedTo} />
          }
        </div>
        <div className="error">{fetchUsersError}</div>
        <div className="error">{teamMembersError}</div>
        <div className={'acf-field acf-input top-space-10'}>
          <div className={'acf-label'}><label className={styles.label}>Project Milestones</label></div>
          <div className={styles.milestones}>{mapMilestones()}</div>
          <div className={styles.input_group}>
            <input type="text" value={milestoneInput} onChange={e=>{setMilestoneInput(e.target.value); setMilestoneError('')}} placeholder="Enter new Milestone"></input>
            <button type="button" className={styles.button + ' add'} onClick={()=>{
              if(validateMilestone(milestoneInput, setMilestoneError)) {
                setMilestones([...milestones, milestoneInput]);
                setMilestoneInput('');
              }
          }}>+</button>
          </div>
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
