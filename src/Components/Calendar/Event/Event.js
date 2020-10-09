import React from 'react';
import styles from './Event.module.css';

const Event = ({id, title, colspan, setSidebarOpen, setCurrentEventID}) => {
  const onClick = () => {
    setSidebarOpen(true);
    setCurrentEventID(id);
  }
  return (
    <td className={styles.event} colSpan={colspan} onClick={onClick}>
      <div className={styles.event_inner}>{title}</div>
    </td>
  )
}

export default Event;