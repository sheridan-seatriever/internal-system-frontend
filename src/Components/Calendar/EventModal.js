import React,{useState, useEffect} from 'react';
import styles from '../../Styles/EventModal.module.css';
import moment from 'moment';
import axios from 'axios';
import nextId from "react-id-generator";
import Modal from '../Modal';
import DatePicker from 'react-datepicker';
import TimePicker from '../TimePicker';
import "react-datepicker/dist/react-datepicker.css";


function EventModal(props) {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersInput, setUsersInput] = useState(null);
  const [startDateInput, setStartDateInput] = useState(new Date());
  const [endDateInput, setEndDateInput] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      const users = await axios.get('http://localhost:8080/testsite/wp-json/system-api/v1/users_studio');
      setUsers(users.data);
      setUsersInput(users.data);
      setLoading(false);
    }
    fetchData();
  }, [])

  useEffect(() => {
    setStartDateInput(props.modalStartDate);
  }, [props.modalStartDate])

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
  
  const submit = async e => {
    e.preventDefault();
    if(validateSubmit()) {
      //disables DST conversion
        let offset = startDateInput.getTimezoneOffset();
        offset = Math.abs(offset / 60);
        startDateInput.setHours(startDateInput.getHours() + offset);
      //disables DST conversion
        offset = endDateInput.getTimezoneOffset();
        offset = Math.abs(offset / 60);
        endDateInput.setHours(endDateInput.getHours() + offset);
      const res = await axios.post('http://localhost:8080/testsite/wp-json/system-api/v1/create_studio_project', {
        title,
        milestones,
        members: teamMembers,
        startDate: moment(startDateInput).format('YYYYMMDD'),
        endDate: moment(endDateInput).format('YYYYMMDD'),
      });
    }
  }

  //validation
  const validateSubmit = () => {
    let valid = true;
    setTitleError('');
    setTeamMembersError('');
    setDateError('');
    if(!validateTitle(title)) {
      valid = false; 
    }
    if(!validateTeamMembers(teamMembers)) {
      valid = false;
    }
    if(!validateDates(startDateInput, endDateInput)) {
      valid = false;
    }
    if(!validateTime(startTimeInput)) {
      valid = false;
    } else if(!validateTime(endTimeInput)) {
      valid = false;
    }
    return valid;
  }

  const validateTime = time => {
    let valid = true;
    if(time.hour===''||time.minute==='') {
      setTimeError('Please enter a valid start and end time');
      valid = false;
    } if(isNaN(parseInt(time.hour))||isNaN(parseInt(time.minute))) {
      setTimeError('Please enter a valid start and end time');
      valid = false;
    } else if(time.hour>12||time.hour<1) {
      setTimeError('Please enter a valid start and end time');
      valid = false;
    } else if(time.minute>59||time.minute<0) {
      setTimeError('Please enter a valid start and end time');
      valid = true;
    }
    return valid;
  }

  const validateDates = (startDate, endDate) => {
    let valid = true;
    if(!startDate||!endDate) {
      valid = false;
      setDateError('Please enter a valid start and end date');
    }
    return valid;
  }

  const validateTeamMembers = teamMembers => {
    let valid = true;
    if(teamMembers.length<1) {
      valid = false;
      setTeamMembersError('Please select at least one project member');
    }
    return valid;
  }

  const validateMilestone = milestone => {
    let valid = true;
    if(milestone.length < 1) {
      valid = false;
    } else if(milestone.length > 100) {
      valid = false;
      setMilestoneError('Must be 100 characters or less');
    }
    return valid; 
  }

  const validateTitle = title => {
    let valid = true;
    console.log('validate')
    if(title.length < 1) {
      valid = false;
      setTitleError('Please enter a project title');
    } else if(title.length > 50) {
      valid = false;
      setTitleError('Must be 50 characters or less');
    }
    return valid;
  }

  //functions
  const closeModalResetState = () => {
    props.closeModal();
    setTitle('');
    setStartDateInput(new Date());
    setEndDateInput(new Date());
    setMilestoneInput('');
    setMilestones([]);
    setTeamMembers([]);
    setUsersInput(users);
    
    setTitleError('');
    setTeamMembersError('');
    setMilestoneError('');
    setDateError('');
  }

  //html

  const mapUsersInput = () => {
    if(usersInput) {
      return usersInput.map(user=>{
        return (
          <div key={nextId()} className={styles.user_container}>
            <div className={styles.user}>{user.user_name}</div>
            <button className={styles.button} type="button" onClick={()=>{
              setTeamMembersError('');
              setTeamMembers([...teamMembers, user]);
              const index = usersInput.indexOf(user);
              setUsersInput([...usersInput.slice(0,index), ...usersInput.slice(index+1,usersInput.length)]);
            }}>Add</button>
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
            <button className={styles.button} type="button" onClick={()=>{
              setUsersInput([...usersInput, member]);
              const index = teamMembers.indexOf(member);
              setTeamMembers([...teamMembers.slice(0,index), ...teamMembers.slice(index+1, teamMembers.length)])
            }}>Remove</button>
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
            <div className={styles.user}>{milestone.title}</div>
            <button className={styles.button} type="button" onClick={()=>{
              const index = milestones.indexOf(milestone);
              setMilestones([...milestones.slice(0,index), ...milestones.slice(index+1, milestones.length)]);
            }}>Remove</button>
          </div>
        )
      })
    }
  }

  return (
    <Modal callback={closeModalResetState} open={props.modalOpen}>
      {props.children}
      <div className={`${`${styles.modal} ${styles.transform}`} ${props.modalOpen?styles.open:''}`} >
        <div className={styles.modal_header}>Add new project</div>
        <form onSubmit={e=>submit(e)} className={styles.inner}>
          <input placeholder="Project title" className={`${styles.title} ${titleError?styles.error_input:''}`} value={title} onChange={e=>{
            setTitleError('');
            setTitle(e.target.value);
          }}></input>
          <div className={styles.error_message}>{titleError}</div>
          <div className={styles.input_group}>
            <label className={styles.label}>Start:</label>
            <DatePicker selected={startDateInput} onChange={date=>{
              setDateError('');
              setStartDateInput(date);
            }}/>
            <label className={styles.time_label}>At:</label>
            <TimePicker time={startTimeInput} setTime={setStartTimeInput} onChange={()=>setTimeError('')}/>
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>End:&nbsp;&nbsp;</label>
            <DatePicker selected={endDateInput} onChange={date=>{
              setDateError('');
              setEndDateInput(date);
            }}/>
            <label className={styles.time_label}>At:</label>
            <TimePicker time={endTimeInput} setTime={setEndTimeInput} onChange={()=>setTimeError('')}/>
          </div>
          <div className={styles.error_message}>{dateError}</div>
          <div className={styles.error_message}>{timeError}</div>
          <label className={styles.label}>Project members:</label>
          <div className={styles.team_members_container}>
            <div className={styles.team_members}>{mapUsersInput()}</div>
            <div className={styles.team_members}>{mapTeamMembers()}</div>
          </div>
          <div className={styles.error_message}>{teamMembersError}</div>
          <label className={styles.label}>Milestones:</label>
          <div className={styles.milestones}>{mapMilestones()}</div>
          <div className={styles.input_group}>
            <input type="text" className={`${styles.input_group_input} ${milestoneError?styles.error_input:''}`} value={milestoneInput} onChange={e=>{
              setMilestoneError('');
              setMilestoneInput(e.target.value);
            }}></input>
            <button type="button" className={styles.button} onClick={()=>{
              if(validateMilestone(milestoneInput)) {
                setMilestones([...milestones, {title: milestoneInput}]);
                setMilestoneInput('');
              }
            }}>Add</button>
          </div>
          <div className={styles.error_message}>{milestoneError}</div>
          <div className={styles.button_group}>
            <button className={styles.button} type="submit">Submit</button>
            <button className={`${styles.button} ${styles.cancel_button}`} type="button" onClick={closeModalResetState}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EventModal;