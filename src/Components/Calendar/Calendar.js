import React, {useState} from 'react';
import styles from '../../Styles/Calendar.module.css';
import DateGrid from './DateGrid';
import EventModal from './EventModal';

function Calendar() {
  const getCurrentMonth = () => {
    const date = new Date();
    return date.getMonth();
  }
  const getCurrentYear = () => {
    const date = new Date();
    return date.getFullYear();
  }
  const [modalOpen, setModalOpen] = useState(false);
  const [month, setMonth] = useState(getCurrentMonth())
  const [year, setYear] = useState(getCurrentYear());

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

  const date = new Date();

  return(
      <div className={"container animated both zoomIn bg"}><span></span>
        <div className={styles.calendar}>
          <div className={styles.header}>
            <div className={styles.button_group}>
              <button className={styles.button} onClick={()=>decrementMonth(month, setMonth, year, setYear)}>&lt;</button>
              <button className={styles.button} onClick={()=>incrementMonth(month, setMonth, year, setYear)}>&gt;</button>
              <button className={styles.button} onClick={()=>setDateToCurrentDay()}>Today</button>
              <EventModal closeModal={()=>{setModalOpen(false)}} modalOpen={modalOpen} startDate={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`}>
                <button className={`${styles.button} ${styles.add_new_button}`} onClick={()=>setModalOpen(!modalOpen)}>Add New</button>
              </EventModal>
            </div>
            <div className={styles.button_group}>
              <h3>{getMonth(month) + ' ' + year}</h3>
            </div>
            <div className={styles.button_group}>
              <button className={styles.button} onClick={()=>setYear(year-1)}>Prev Year</button>
              <button className={styles.button} onClick={()=>setYear(year+1)}>Next Year</button>
            </div>
          </div>
          <DateGrid year={year} month={month}/>
        </div>
    </div>
  )
}

export default Calendar
