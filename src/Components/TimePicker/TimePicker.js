import React from 'react';
import styles from './TimePicker.module.css';

const TimePicker = ({time, setTime, onChange}) => {

  const hourChange = value => {
    onChange();
    setTime({...time, hour: value});
  }

  const minuteChange = value => {
    onChange();
    setTime({...time, minute: value});
  }

  const periodChange = value => {
    if(value === 'AM') {
      setTime({...time, period: 'PM'});
    } else {
      setTime({...time, period: 'AM'});
    }
  }

  return (
    <div className={styles.container}>
      <input className={styles.child} value={time.hour} onChange={e=>hourChange(e.target.value)}></input> : 
      <input className={styles.child} value={time.minute} onChange={e=>minuteChange(e.target.value)}></input>
      <button type="button" className={time.period==='AM'?styles.am_button:styles.pm_button} onClick={()=>periodChange(time.period)}>{time.period}</button>
    </div>
  )
}

export default TimePicker;