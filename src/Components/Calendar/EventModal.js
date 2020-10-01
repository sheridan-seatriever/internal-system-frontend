import React,{useState, useEffect} from 'react';
import styles from '../../Styles/EventModal.module.css';
import axios from 'axios';
import nextId from "react-id-generator";
import Modal from '../Modal';



function EventModal(props) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const users = await axios.get('http://localhost:3001/user/users');
      setUsers(users.data);
    }
    fetchData();
  }, [])

  const [teamMembers, setTeamMembers] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [milestoneInput, setMilestoneInput] = useState('');

  const [title, setTitle] = useState('New Project');
  const [startDateInput, setStartDateInput] = useState(props.startDate);
  const [endDateInput, setEndDateInput] = useState(props.startDate);
  const [startTimeInput, setStartTimeInput] = useState('09:00:00');
  const [endTimeInput, setEndTimeInput] = useState('05:00:00');

  const submit = async e => {
    //validate
    e.preventDefault();
    let startDate = startDateInput.split('/').reverse();
    let endDate = endDateInput.split('/').reverse();
    startDate = new Date(`${startDate[0]}-${startDate[1].length<2?0+startDate[1]:startDate[1]}-${startDate[2].length<2?0+startDate[2]:startDate[2]}T${startTimeInput}`);
    //disables DST conversion
      let offset = startDate.getTimezoneOffset();
      offset = Math.abs(offset / 60);
      startDate.setHours(startDate.getHours() + offset);
    endDate = new Date(`${endDate[0]}-${endDate[1].length<2?0+endDate[1]:endDate[1]}-${endDate[2].length<2?0+endDate[2]:endDate[2]}T${endTimeInput}`);
    //disables DST conversion
      offset = endDate.getTimezoneOffset();
      offset = Math.abs(offset / 60);
      endDate.setHours(endDate.getHours() + offset);

    const res = await axios.post('http://localhost:3001/project/create', {
      title,
      members: teamMembers,
      milestones,
      startDate,
      endDate,
    });
  }

  const mapUsers = () => {
    if(users) {
      return users.map(user=>{
        return (
          <div key={nextId()} className={styles.user_container}>
            <div className={styles.user}>{`${user.forename} ${user.surname}`}</div>
            <button className={styles.button} type="button" onClick={()=>{
              setTeamMembers([...teamMembers, user]);
              const index = users.indexOf(user);
              setUsers([...users.slice(0,index), ...users.slice(index+1,users.length)]);
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
            <div className={styles.user}>{`${member.forename} ${member.surname}`}</div>
            <button className={`${styles.button} ${styles.delete}`} type="button" onClick={()=>{
              setUsers([...users, member]);
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
            <div className={styles.user}>{milestone.description}</div>
            <button className={`${styles.button} ${styles.delete}`} type="button" onClick={()=>{
              const index = milestones.indexOf(milestone);
              setMilestones([...milestones.slice(0,index), ...milestones.slice(index+1, milestones.length)]);
            }}>&#10005;</button>
          </div>
        )
      })
    }
  }


  return (
    <Modal callback={props.closeModal} open={props.modalOpen}>
      {props.children}
      <div className={`${`${styles.modal} ${'animated zoomIn bg-blue'} ${styles.transform}`} ${props.modalOpen?styles.open:''}`}  >
        <div className={styles.modal_header}>Add new project</div>
        <form onSubmit={e=>submit(e)} className={styles.inner}>
          <div className={styles.input_group}>
            <label className={styles.label}>Project title:</label>
            <input value={title} onChange={e=>setTitle(e.target.value)}></input>
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>Start:</label>
            <input value={startDateInput} onChange={e=>setStartDateInput(e.target.value)}></input>
            <label className={styles.time_label}>At:</label>
            <input value={startTimeInput} onChange={e=>setStartTimeInput(e.target.value)}></input>
          </div>
          <div className={styles.input_group}>
            <label className={styles.label}>End:&nbsp;&nbsp;</label>
            <input value={endDateInput} onChange={e=>setEndDateInput(e.target.value)}></input>
            <label className={styles.time_label}>At:</label>
            <input value={endTimeInput} onChange={e=>setEndTimeInput(e.target.value)}></input>
          </div>
          <label className={styles.label}>Project members:</label>
          <div className={styles.team_members_container}>
            <div className={styles.team_members}>{mapUsers()}</div>
            <div className={styles.team_members}>{mapTeamMembers()}</div>
          </div>
          <div className={'acf-field acf-input'}>
              <div className={'acf-label'}><label className={styles.label}>Project Milestones</label></div>
              <div className={styles.milestones}>{mapMilestones()}</div>
              <div className={styles.input_group}>
                <input type="text" value={milestoneInput} onChange={e=>setMilestoneInput(e.target.value)}></input>
                <button type="button" className={styles.button} onClick={()=>{
                  //validate
                  setMilestones([...milestones, {description: milestoneInput, completed: false}]);
                  setMilestoneInput('');
                }}>Add</button>
              </div>
          </div>
          <div className={styles.button_group}>
            <button className={styles.button} type="submit">Submit</button>
            <button className={`${styles.button} ${styles.cancel_button}`} type="button" onClick={props.closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EventModal;
