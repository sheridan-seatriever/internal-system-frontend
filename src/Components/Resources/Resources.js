import React, {useState} from 'react';
import styles from './Resource.module.css';
import nextId from 'react-id-generator';
import axios from 'axios';

const Header = ({dates}) => {
  let headings = [];
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  if(dates) {
    for(let i=0; i<5; i++) {
      headings[i] = <div key={nextId()} className={styles.grid_header_inner}>{`${days[i]} ${dates[i].day}`}</div>
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.grid_header}>
        <div></div>
        {headings}
      </div>
    </div>
  )
}

const Row = ({user, projects, dates, year}) => {

  const mapDates = () => {
    let mapped = []
    for(let i=0;i<5;i++) {
      mapped.push(
        <div key={nextId()} className={styles.grid_split}>
          <Dropdown projects={projects} userId={user.user_id} period="AM" date={[year, dates[i].month, dates[i].day]}/>
          <Dropdown projects={projects} userId={user.user_id} period="PM" date={[year, dates[i].month, dates[i].day]}/>
        </div>
      )
    }
    return mapped;
  }

  return (
    <div key={nextId()} className={styles.grid_body}>
      <div className={styles.grid_vertical_header}>
        <div className={styles.grid_name}>{user.user_name}</div>
        <div className={styles.grid_am}>AM</div>
        <div className={styles.grid_pm}>PM</div>
      </div>
      {mapDates()}
    </div>
  )
}

const Dropdown = ({projects, userId, period, date}) => {
  const dateUTC = new Date(Date.UTC(date[0], date[1], date[2]));
  const [selectValue, setSelectValue] = useState('unassigned');
  
  const mapProjects = () => {
    if(projects) {
      return projects.map(project=>{
        if(dateUTC>=project.startDateUTC&&dateUTC<project.endDateUTC) {
          return <option key={nextId()} value={project.project_id}>{project.project_title}</option>
        }
      })
    }
  }

  return (
    <select className={selectValue==='unassigned'?styles.unassigned:''} value={selectValue} onChange={async e=>{
        setSelectValue(e.target.value);
        let project_id = null;
        let absence_reason = null;
        if(isNaN(parseInt(e.target.value))) {
          absence_reason = e.target.value;
        } else {
          project_id = e.target.value;
        }
        const obj = {
          user_id: parseInt(userId),
          date: date.join('-'),
          project_id,
          absence_reason,
          period
        }
        console.log(obj)
        const res = await axios.post(`${process.env.REACT_APP_API_URL}schedule`, obj);
        console.log(res.data)
      }}>
      <option key={nextId()} value="unassigned">Unassigned</option>
      <option key={nextId()} value="holiday">Holiday</option>
      <option key={nextId()} value="non working day">Non working day</option>
      <option key={nextId()} value="sick">Sick</option>
      <option key={nextId()} value="out of office">Out of office</option>
      <option key={nextId()} value="working from home">Working from home</option>
      {mapProjects()}
    </select>
  )
}


const Week = ({users, projects, dates, year, month}) => {
  return (
    <div key={nextId()} className="form_element">
      <Header dates={dates} />
      {users&&users.map(user=><Row key={nextId()} user={user} projects={projects} dates={dates} year={year}/>)}
    </div>
  )
}

const WeekTabs = ({datesInEachWeek, tab, setTab}) => {
  const tabs = [];
  if(datesInEachWeek) {
    for(let i=0; i<datesInEachWeek.length; i++) {
      tabs.push(<button key={nextId()} className={`${styles.tab} ${i===tab&&"active"}`} onClick={()=>setTab(i)}>{`Week ${i+1}`}</button>);
    }
  }
  return <div className={styles.week_tabs}>{tabs}</div>
}

const Resources = ({users, projects, datesInEachWeek, year, month}) => {
  const [tab, setTab] = useState(0);
  const mapProjects = () => {
    if(projects) {
      return projects.map(project=>{
        const startDateArray = (project.project_start_date.split(' '))[0].split('-');
        const endDateArray = (project.project_end_date.split(' '))[0].split('-');
        project.startDateUTC = Date.UTC(startDateArray[0], startDateArray[1]-1, startDateArray[2]);
        project.endDateUTC = Date.UTC(endDateArray[0], endDateArray[1]-1, endDateArray[2]);
        return project;
      })
    }
  }

  return (
    <div>
      <WeekTabs datesInEachWeek={datesInEachWeek} tab={tab} setTab={setTab} />
      <Week users={users} projects={mapProjects()} dates={datesInEachWeek&&datesInEachWeek[tab]} year={year} month={month}/>
    </div>
  )
}

export default Resources;