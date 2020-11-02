import React, {useState, useEffect} from 'react';
import styles from './Resource.module.css';
import nextId from 'react-id-generator';
import moment from 'moment';
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

const Row = ({user, projects, dates, schedule, year}) => {

  const mapDates = () => {
    let mapped = []
    for(let i=0;i<5;i++) {
      mapped.push(
        <div key={nextId()} className={styles.grid_split}>
          <Dropdown projects={projects} schedule={schedule} userId={user.user_id} period="AM" date={[year, dates[i].month, dates[i].day]}/>
          <Dropdown projects={projects} schedule={schedule} userId={user.user_id} period="PM" date={[year, dates[i].month, dates[i].day]}/>
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

const Dropdown = ({projects, schedule, userId, period, date}) => {
  const dateUTC = new Date(Date.UTC(date[0], date[1], date[2]));
  const dateString = moment(dateUTC).format('YYYY-MM-DD');
  const [selectValue, setSelectValue] = useState('unassigned');

  let currentSchedule;

  if(schedule) {
    currentSchedule = schedule.find(schedule=>schedule.date===dateString);
  }
  
  const mapOptions = () => {
    let options = [
      {value: 'unassigned', inner: 'Unassigned'},
      {value: 'holiday', inner: 'Holiday'},
      {value: 'non working day', inner: 'Non working day'},
      {value: 'sick', inner: 'Sick'},
      {value: 'out of office', inner: 'Out of office'},
      {value: 'working from home', inner: 'Working from home'}
    ]

    let projectOptions = [];
    let projectsCurrentDate = [];

    if(currentSchedule) {
      if(currentSchedule.project_id) {
        if(projects) {
          projectOptions = projects.map(project=>{
            if(project.project_id===currentSchedule.project_id) {
              return <option defaultValue key={nextId()} value={project.project_id}>{project.project_title}</option>
            } else {
              return <option key={nextId()} value={project.project_id}>{project.project_title}</option>
            }
          })
        }
        options = options.map(option=><option key={nextId()} value={option.value}>{option.inner}</option>);
      } else {
        if(projects) {
          projectOptions = projects.map(project=><option key={nextId()} value={project.project_id}>{project.project_title}</option>)
        }
        options = options.map(option=>{
          if(currentSchedule.absence_reason===option.value) {
            return <option defaultValue key={nextId()} value={option.value}>{option.inner}</option>
          } else {
            return <option key={nextId()} value={option.value}>{option.inner}</option>
          }
        });
      }
    } else {
      if(projects) {
        projectOptions = projects.map(project=><option key={nextId()} value={project.project_id}>{project.project_title}</option>)
      }
      options = options.map(option=><option key={nextId()} value={option.value}>{option.inner}</option>);
    }
    return options.concat(projectOptions);
  }


  console.log(mapOptions());

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
          date: dateString,
          project_id,
          absence_reason,
          period
        }
        await axios.post(`${process.env.REACT_APP_API_URL}schedule`, obj);
      }}>
      {mapOptions()}
    </select>
  )
}


const Week = ({users, projects, dates, schedule, year}) => {
  return (
    <div key={nextId()} className="form_element">
      <Header dates={dates} />
      {users&&users.map(user=><Row key={nextId()} user={user} projects={projects} dates={dates} schedule={schedule} year={year}/>)}
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
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const startDate = `${year}-${datesInEachWeek[tab][0].month+1}-${datesInEachWeek[tab][0].day}`;
      const endDate = `${year}-${datesInEachWeek[tab][4].month+1}-${datesInEachWeek[tab][4].day}`;
      console.log(`${process.env.REACT_APP_API_URL}schedule?start?start_date=${startDate}&&end_date=${endDate}`);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}schedule?start?start_date=${startDate}&&end_date=${endDate}`);
      setSchedule(res.data);
    }
    if(datesInEachWeek&&year&&month) {
      fetchSchedule();
    }
  }, [datesInEachWeek, year, month, tab])

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
      <Week users={users} projects={mapProjects()} dates={datesInEachWeek&&datesInEachWeek[tab]} schedule={schedule} year={year}/>
    </div>
  )
}

export default Resources;