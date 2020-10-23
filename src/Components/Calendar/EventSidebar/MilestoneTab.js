import React,{useState, useEffect} from 'react';
import styles from './EventSidebar.module.css';
import MilestoneTable from './MilestoneTable';
import NewMilestone from './NewMilestone';
import moment from 'moment';
import to24Hour from '../../../Functions/to24Hour';
import axios from 'axios';
import {validateTitle, validateDescription, validateDates, validateTime} from './validate';

const MilestoneTab = ({currentEventID, fetchData, notifySuccess}) => {

  const [milestones, setMilestones] = useState(null);
  const [milestoneTitle, setMilestoneTitle] = useState('');
  const [milestoneTitleError, setMilestoneTitleError] = useState('');
  const [milestoneDescription, setMilestoneDescription] = useState('');
  const [milestoneDescriptionError, setMilestoneDescriptionError] = useState('');
  const [startDateInput, setStartDateInput] = useState(new Date());
  const [endDateInput, setEndDateInput] = useState(new Date());
  const [dateError, setDateError] = useState('');
  const [startTimeInput, setStartTimeInput] = useState({hour: '9', minute: '00', period: 'AM'});
  const [endTimeInput, setEndTimeInput] = useState({hour: '5', minute: '00', period: 'PM'});
  const [timeError, setTimeError] = useState('');
  const [newMilestone, setNewMilestone] = useState(false);

  const fetchMilestones = async (currentEventID) => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}milestone_by_id?project_id=${currentEventID}`);
      setMilestones(res.data);
    }

  useEffect(() => {
    if(currentEventID) {
      fetchMilestones(currentEventID);
    } else {
      closeAndResetState();
    }
  }, [currentEventID])

  const closeAndResetState = () => {
    setMilestones(null);
    setMilestoneTitle('');
    setMilestoneTitleError('');
    setMilestoneDescription('');
    setMilestoneDescriptionError('');
    setStartDateInput(new Date());
    setEndDateInput(new Date());
    setDateError('')
    setStartTimeInput({hour: '9', minute: '00', period: 'AM'});
    setEndTimeInput({hour: '5', minute: '00', period: 'PM'});
    setTimeError('');
    setNewMilestone(false);
  }

  const validateSubmit = () => {
    let valid = true;
    if(!validateTitle(milestoneTitle, setMilestoneTitleError)) valid = false;
    if(!validateDescription(milestoneDescription, setMilestoneDescriptionError)) valid = false;
    const startDate = new Date(moment(startDateInput).format('YYYY-MM-DD ' + to24Hour(startTimeInput)));
    const endDate = new Date(moment(endDateInput).format('YYYY-MM-DD ' + to24Hour(endTimeInput)));
    if(!validateDates(startDate, endDate, setDateError)) valid = false;
    if(!validateTime(startTimeInput, setTimeError)) valid = false; 
    if(!validateTime(endTimeInput, setTimeError)) valid = false;
    return valid;
  }

  const submit = async () => {
    if(validateSubmit()) {
      const start_time = to24Hour(startTimeInput);
      const end_time = to24Hour(endTimeInput);
      const milestone = {
        milestone_title: milestoneTitle,
        milestone_description: milestoneDescription,
        milestone_start_date: moment(startDateInput).format('YYYY-MM-DD ' + start_time),
        milestone_end_date: moment(endDateInput).format('YYYY-MM-DD ' + end_time),
        project_id: currentEventID
      }
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}milestones`, milestone);
        fetchData();
        fetchMilestones(currentEventID);
        notifySuccess('Created milestone', null, 2500);
      } catch(err) {
        console.log(err);
      }
    }
  }

  const deleteMilestone = async milestoneId => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}milestones?milestone_id=${milestoneId}`);
      fetchData();
      fetchMilestones(currentEventID);
      notifySuccess('Deleted milestone', null, 2500);
    } catch(err) {
      console.log(err);
    }
  }

  const childProps = {
    milestoneTitle,
    setMilestoneTitle,
    milestoneTitleError,
    setMilestoneTitleError,
    milestoneDescription,
    milestoneDescriptionError,
    setMilestoneDescriptionError,
    setMilestoneDescription,
    startDateInput,
    setStartDateInput,
    endDateInput,
    setEndDateInput,
    startTimeInput,
    setStartTimeInput,
    endTimeInput,
    setEndTimeInput,
    dateError,
    setDateError,
    timeError,
    setTimeError,
    submit,
  }

  return (
    <div className={styles.milestone_tab_inner}>
      <button type="button" className={`${'button-primary center'}`} onClick={()=>setNewMilestone(!newMilestone)}>New Milestone</button>
      { 
        newMilestone &&
        <NewMilestone
          {...childProps}
        />
      }
      <MilestoneTable milestones={milestones} deleteMilestone={deleteMilestone} />
    </div>
  )
}

export default MilestoneTab;