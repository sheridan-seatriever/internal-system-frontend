import React,{useState, useEffect} from 'react';
import styles from './EventSidebar.module.css';
import axios from 'axios';
import AddList from '../../AddList';
import SearchInput from '../../SearchInput';
import {cloneDeep} from 'lodash';
import {validateMilestoneInput, validateAssignedToInput} from './validate.js';

const EventSidebar = ({currentEventID, setCurrentEventID, users, fetchUsersError, loadingUsers, events, setEvents}) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [manager, setManager] = useState('');
  const [assignedTo, setAssignedTo] = useState([]);
  const [assignedToError, setAssignedToError] = useState('');
  const [assignedToInput, setAssignedToInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const event = (await axios.get(`${process.env.REACT_APP_API_URL}projects_by_id?project_id=${currentEventID}`)).data;
        const project_manager = users.find(user=>user.user_id==event.manager_user_id);
        let assigned_to = event.project_assigned_to.map(assignedUser=>users.find(user=>user.user_id===assignedUser.assigned_to_user_id));
        assigned_to = assigned_to.map(user=>user.user_name)
        setTitle(event.project_title);
        setDescription(event.project_description);
        setManager(project_manager.user_name);
        setAssignedTo(assigned_to);
        
      } catch(err) {
        console.log(err);
      }
    }
    if(currentEventID) {
      fetchData();
    }
  }, [currentEventID])

  const deleteProject = async () => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}projects?project_id=${currentEventID}`);
      let updatedEvents = cloneDeep(events);
      updatedEvents = updatedEvents.filter(event=>event.project_id!==currentEventID);
      setEvents(updatedEvents);
      setCurrentEventID('');
    } catch(err) {
      setError('Error, could not delete event');
    }
    setLoading(false);
  }

  return (
    <>
      <div className={`${styles.buffer} ${currentEventID&&styles.open}`}></div>
      <div className={`${styles.container} ${currentEventID&&styles.open}`}>
        <div className={styles.button_group}>
          <button type="button" className={`${styles.cancel}`} onClick={()=>setCurrentEventID('')}>CANCEL</button>
        </div>
        <div className={'form_element'}>
          <label>Project Title:</label>
          <input className={styles.input} value={title} onChange={e=>setTitle(e.target.value)}/>
        </div>
        <div className={'form_element'}>
          <label>Project Description:</label>
          <textarea className={`${styles.input} ${styles.input_large}`} value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <div className={'form_element'}>
          <label>Project Manager:</label>
          {loadingUsers?
            <div>loading</div>:
            <SearchInput data={users.map(user=>({name: user.user_name, id: user.user_id}))} input={manager} setInput={setManager} />
          }
        </div>
        <div className="error">{fetchUsersError}</div>
        <div className={'form_element'}>
        <label>Assigned To:</label>
        {
          loadingUsers? 
          <div>loading</div>:
          <AddList
            data={users.map(user=>({name: user.user_name, id: user.user_id}))} 
            placeholder={'Add user'}
            validate={()=>true} 
            selectedData={assignedTo} 
            setSelectedData={setAssignedTo}
            validate={input=>validateAssignedToInput(input, assignedTo, setAssignedToError, users)}
            setError={setAssignedToError} 
            input={assignedToInput} 
            setInput={setAssignedToInput}/>
        }
        </div>
        <div className="error">{fetchUsersError}</div>
        <div className="error">{assignedToError}</div>
        <div className={styles.button_group}>
          <button type="button" className={`${styles.delete}`} onClick={deleteProject}>DELETE PROJECT</button>
          <button type="button" className={`${'button-primary'} ${styles.button_primary}`} onClick={deleteProject}>UPDATE PROJECT</button>
        </div>
      </div>
    </>
  )
}

export default EventSidebar;