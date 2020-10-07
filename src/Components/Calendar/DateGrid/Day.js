import React from 'react';
import nextId from "react-id-generator";
import styles from './DateGrid.module.css';

const Day = ({notCurrentMonth, currentDay, onClick}) => {

  const handleClick = () => {
    if(!notCurrentMonth) {
      onClick();
    }
  }

  return (
    <div className={`${styles.day} ${notCurrentMonth&&styles.notCurrentMonth} ${currentDay&&styles.current_day}`} key={nextId()} onClick={handleClick}/>
  )
}

export default Day;