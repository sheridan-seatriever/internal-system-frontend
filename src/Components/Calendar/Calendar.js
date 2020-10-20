import React, {useState} from 'react';
import styles from './Calendar.module.css';

function Calendar({children, modalOpen, setModalOpen, setModalStartDate, month, setMonth, year, setYear}) {

  const getMonth = monthInt => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November', 
      'December'
    ]
    return months[monthInt];
  }

  const incrementMonth = (month, setMonth, year, setYear) => {
    if(month === 11) {
      setMonth(0);
      setYear(++year);
    } else {
      setMonth(++month);
    }
  }

  const decrementMonth = (month, setMonth, year, setYear) => {
    if(month === 0) {
      setMonth(11);
      setYear(--year);
    } else {
      setMonth(--month);
    }
  }

  const setDateToCurrentDay = () => {
    const date = new Date();
    setMonth(date.getMonth());
    setYear(date.getFullYear())
  }

  return(
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.button_group}>
          <button className={styles.button} onClick={()=>decrementMonth(month, setMonth, year, setYear)}>&lt;</button>
          <button className={styles.button} onClick={()=>incrementMonth(month, setMonth, year, setYear)}>&gt;</button>
          <button className={styles.button} onClick={()=>setDateToCurrentDay()}>Today</button>
          <button className={`${styles.button} ${styles.add_new_button}`} onClick={()=>{
            setModalStartDate(new Date());
            setModalOpen(!modalOpen);
          }}>Add New</button>
        </div>
        <div className={styles.button_group}>
          <h3>{getMonth(month) + ' ' + year}</h3>
        </div>
        <div className={styles.button_group}>
          <button className={styles.button} onClick={()=>setYear(year-1)}>Prev Year</button>
          <button className={styles.button} onClick={()=>setYear(year+1)}>Next Year</button>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Calendar 