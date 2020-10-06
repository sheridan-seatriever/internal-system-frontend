import React, {useState} from 'react';
import styles from './CalendarView.module.css';
import Calendar from '../../Components/Calendar';
import EventSidebar from '../../Components/EventSidebar';


const CalendarView = () => {
const [open, setOpen] = useState(false);
  return(
    <div className={styles.container}>
      <EventSidebar open={open} />
      <Calendar />
      <button onClick={()=>setOpen(!open)}>open</button>
    </div>
  )
}

export default CalendarView;