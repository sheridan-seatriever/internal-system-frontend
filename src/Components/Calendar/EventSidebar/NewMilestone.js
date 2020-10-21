import React from 'react';
import styles from './EventSidebar.module.css';
import DatePicker from 'react-datepicker';
import TimePicker from '../../TimePicker/TimePicker';
import loadingIcon from './loading.png';

const NewMilestone = ({
    milestoneTitle,
    setMilestoneTitle,
    milestoneTitleError,
    setMilestoneTitleError,
    milestoneDescription,
    milestoneDescriptionError, 
    setMilestoneDescription, 
    setMilestoneDescriptionError,
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
    submit
  }) => {

  const titleChange = e => {
    setMilestoneTitleError('');
    setMilestoneTitle(e.target.value);
  }

  const descriptionChange = e => {
    setMilestoneDescriptionError('');
    setMilestoneDescription(e.target.value);
  }

  return(
    <div className={`${styles.new_milestone} ${'container both'}`}>
      <div className="form_element">
        <div className={'form_element'}>
          <label>Milestone Title:</label>
          <input className={styles.input} value={milestoneTitle} onChange={titleChange}/>
          <div className="error form_element"></div>
        </div>
        <div className="error">{milestoneTitleError}</div>
        <div className={'form_element'}>
          <label>Milestone Description:</label>
          <textarea className={`${styles.input} ${styles.input_large}`} value={milestoneDescription} onChange={descriptionChange}></textarea>
          <div className="error">{milestoneDescriptionError}</div>
        </div>
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
      <div className="error form_element">{dateError}</div>
      <div className="error form_element">{timeError}</div>
      <div className={styles.button_group}>
        <button type="button" className={`${'button-primary center'} ${styles.button_primary}`} onClick={submit}>SUBMIT MILESTONE 
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

export default NewMilestone;