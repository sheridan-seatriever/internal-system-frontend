import React from 'react';
import styles from '../Styles/Main.module.css';
import TopNav from '../Components/TopNav';
import SideBar from '../Components/SideBar';

function Main(props) {
  return(
    <div className={styles.container}>
      <TopNav />
      <SideBar />
      {props.children}
    </div>
  )
}

export default Main;