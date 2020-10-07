import React,{useState} from 'react';
import styles from './Event.module.css';

const Event = ({project_title, colspan}) => {
  return (
    <td className={styles.event} colSpan={colspan}>
      <div className={styles.event_inner}>{project_title}</div>
    </td>
  )
}

export default Event;