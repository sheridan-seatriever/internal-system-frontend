import React from 'react';
import styles from '../DateGrid.module.css';
import nextId from "react-id-generator";
import Event from '../../Event';
import {cloneDeep} from 'lodash';

const containerTableGenerator = (eventTable, dateRange, dayRange, setCurrentEventID, setSidebarTab) => {
    //generates a colspan for each Event and pushes empty td if no Event
    const htmlRowGenerator = row => {
      let tempRow = cloneDeep(row);
      const htmlRowArray = [];
      for(let i=0;i<7;i++){
        if(tempRow[0]) {
          if(tempRow[0].startInt!==i) {
            htmlRowArray.push(<td key={nextId()}></td>);
          } else {
            const colspan = tempRow[0].endInt - tempRow[0].startInt;
            let tab = '';
            if(tempRow[0].milestone_id) {
              tab = 'milestone';
            } else if(tempRow[0].task_id) {
              tab = 'task';
            } else {
              tab = 'project'
            }
            htmlRowArray.push(
              <Event 
                key={nextId()} 
                id={tempRow[0].project_id || tempRow[0].milestone_id || tempRow[0].task_id} 
                title={tempRow[0].project_title ||tempRow[0].milestone_title ||tempRow[0].task_title} 
                colspan={colspan} setCurrentEventID={setCurrentEventID} 
                setSidebarTab={() => setSidebarTab(tab)}
                milestone={tempRow[0].milestone_id?true:false}
                task={tempRow[0].task_id?true:false}
              />)
            i+=(colspan-1);
            tempRow.shift();
          }
        } else {
          htmlRowArray.push(<td key={nextId()}></td>);
        }
      }
      return <tr key={nextId()} className="width_max">{htmlRowArray}</tr>;
    }
    ////////////////////////////////////////////////
    const htmlTableArray = [];
    eventTable.map(row=>{
      htmlTableArray.push(htmlRowGenerator(row));
    })
    const dateRow = [];
    dateRange.map(date=>{
      dateRow.push(<th key={nextId()} className={styles.cell_date}>{date}</th>)
    })
    return (
      <tr key={nextId()}>
        <td colSpan="7">
          <div className={styles.table_row_container}>
            <div className={styles.table_day_container}>
              {dayRange}
            </div>
            <div className={styles.day_row}>
              <table className={`${styles.table} ${styles.table_events_container}`}>
                <thead>
                  <tr>
                    {dateRow}
                  </tr> 
                </thead>
                <tbody>
                  {htmlTableArray}
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  export default containerTableGenerator;