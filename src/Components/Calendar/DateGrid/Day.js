import React from 'react';
import styles from './DateGrid.module.css';

const Day = ({notCurrentMonth, currentDay, onClick}) => {

  const handleClick = () => {
    if(!notCurrentMonth) {
      onClick();
    }
  }

  return (
    <div className={`${styles.day} ${notCurrentMonth&&styles.not_current_month} ${currentDay&&styles.current_day}`} onClick={handleClick}/>
  )
}

export default Day;