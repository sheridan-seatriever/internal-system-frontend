import React from 'react';
import styles from '../../../Styles/DateGrid.module.css';
import nextId from "react-id-generator";

const containerTableGenerator = (eventTable, dateRange, dayRange) => {
    const htmlRowGenerator = row => {
      let tempRow = [...row];
      const htmlRowArray = [];
      for(let i=0;i<7;i++){
        if(tempRow[0]) {
          if(tempRow[0].startInt!==i) {
            htmlRowArray.push(<td key={nextId()}></td>);
          } else {
            const colspan = tempRow[0].endInt - tempRow[0].startInt;
            htmlRowArray.push(<td key={nextId()} className={styles.event} colSpan={colspan}><div className={styles.event_inner}>{tempRow[0].project_title}</div></td>);
            i+=(colspan-1);
            tempRow.shift();
          }
        } else {
          htmlRowArray.push(<td key={nextId()}></td>);
        }
      }
      return <tr key={nextId()} className={styles.width_max}>{htmlRowArray}</tr>;
    }
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