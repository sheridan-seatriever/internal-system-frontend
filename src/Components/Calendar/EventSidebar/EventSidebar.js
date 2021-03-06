import React,{useState, useEffect} from 'react';
import styles from './EventSidebar.module.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ProjectTab from './ProjectTab';
import MilestoneTab from './MilestoneTab';
import TaskTab from './TaskTab';

const EventSidebar = ({currentEventID, users, setCurrentEventID, fetchUsersError, loadingUsers, events, setEvents, fetchData, sidebarTab, setSidebarTab}) => {

  const closeAndResetState = () => {
    setCurrentEventID('');
  }

  const notifySuccess = (message, title, timeout) => {
    NotificationManager.success(message, title, timeout);
  }

  let render = null;
  switch(sidebarTab) {
    case 'project':
    render = (
      <>
        <ProjectTab  
          currentEventID={currentEventID}
          users={users}
          setCurrentEventID={setCurrentEventID}
          fetchUsersError={fetchUsersError} 
          loadingUsers={loadingUsers}
          events={events} 
          setEvents={setEvents}
          fetchData={fetchData}
          notifySuccess={notifySuccess}/>
      </>
    )
    break;
    case 'milestone':
      render = (
        <MilestoneTab 
          currentEventID={currentEventID} 
          notifySuccess={notifySuccess} 
          fetchData={fetchData}
        />)
    break;
    case 'task':
      render = (
        <TaskTab 
          users={users}
          currentEventID={currentEventID}
          notifySuccess={notifySuccess}
          fetchData={fetchData}
        />
      )
    break;
  }
  return (
    <>
      <NotificationContainer />
      <div className={`${styles.buffer} ${currentEventID&&styles.open}`}></div>
      <div className={`${styles.container} ${currentEventID&&styles.open}`}>
        <div className={`${styles.button_group} ${styles.mb_30}`}>
          <button type="button" className={`${styles.cancel}`} onClick={closeAndResetState}>CANCEL</button>
          <button type="button" className={`${styles.button_primary} ${sidebarTab==='task'&&'active'}`} onClick={()=>setSidebarTab('task')}>TASKS</button>
          <button type="button" className={`${styles.button_primary} ${sidebarTab==='milestone'&&'active'}`} onClick={()=>setSidebarTab('milestone')}>MILESTONES</button>
          <button type="button" className={`${styles.button_primary} ${sidebarTab==='project'&&'active'}`} onClick={()=>setSidebarTab('project')}>PROJECT</button>
        </div>
        {render}
      </div>
    </>
  )
}

export default EventSidebar;