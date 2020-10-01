import React from 'react';
import styles from '../Styles/SideBar.module.css';

function SideBar() {
  return (
    <div className={styles.container}>
      <div className={styles.nav_item}>Studio<img className={styles.nav_logo} alt='art palette' src='/images/art-palette.png' style={{width: '30px'}} /></div>
    </div>
  )
}

export default SideBar;
