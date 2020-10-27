import React, {useState} from 'react';
import styles from './Resource.module.css';
import nextId from 'react-id-generator';

const Header = ({dates}) => {
  let headings = [];
  let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  if(dates) {
    for(let i=0; i<5; i++) {
      headings[i] = <div className={styles.grid_header_inner}>{`${days[i]} ${dates[i]}`}</div>
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

const Row = ({user, projects}) => {
  return (
    <div key={nextId()} className={styles.grid_body}>
      <div className={styles.grid_vertical_header}>
        <div className={styles.grid_name}>{user.user_name}</div>
        <div className={styles.grid_am}>AM</div>
        <div className={styles.grid_pm}>PM</div>
      </div>
      <div className={styles.grid_split}>
        <Dropdown projects={projects}/>
        <Dropdown projects={projects}/>
      </div>
      <div className={styles.grid_split}>
        <Dropdown projects={projects}/>
        <Dropdown projects={projects}/>
      </div>
      <div className={styles.grid_split}>
        <Dropdown projects={projects}/>
        <Dropdown projects={projects}/>
      </div>
      <div className={styles.grid_split}>
        <Dropdown projects={projects}/>
        <Dropdown projects={projects}/>
      </div>
      <div className={styles.grid_split}>
        <Dropdown projects={projects}/>
        <Dropdown projects={projects}/>
      </div>
    </div>
  )
}

const Dropdown = ({projects}) => {
    return (
    <select>
      <option></option>
      <option value="Holiday">Holiday</option>
      <option value="Non working day">Non working day</option>
      <option value="Sick">Sick</option>
      <option value="Out of office">Out of office</option>
      <option value="Working from home">Working from home</option>
      {projects&&projects.map(project=><option key={nextId()} value={project.project_id}>{project.project_title}</option>)}
    </select>
  )}


const Week = ({users, projects, dates}) => {
  return (
    <div key={nextId()} className="form_element">
      <Header dates={dates} />
      {users&&users.map(user=><Row key={nextId()} user={user} projects={projects}/>)}
    </div>
  )
}

const WeekTabs = ({datesInEachWeek, tab, setTab}) => {
  const tabs = [];
  if(datesInEachWeek) {
    for(let i=0; i<datesInEachWeek.length; i++) {
      tabs.push(<button className={`${styles.tab} ${i===tab&&"active"}`} onClick={()=>setTab(i)}>{`Week ${i+1}`}</button>);
    }
  }
  return <div className={styles.week_tabs}>{tabs}</div>
}

const Resources = ({users, projects, datesInEachWeek}) => {
  const [tab, setTab] = useState(0);
  
  return (
    <div>
      <WeekTabs datesInEachWeek={datesInEachWeek} tab={tab} setTab={setTab} />
      <Week users={users} propjects={projects} dates={datesInEachWeek&&datesInEachWeek[tab]}/>
    </div>
  )
}

export default Resources;