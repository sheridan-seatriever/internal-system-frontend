import React,{useState} from 'react';
import styles from '../Styles/TopNav.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../Actions';
import Modal from './Modal';




function TopNav() {
  const user = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  function logout() {
    localStorage.removeItem('user');
    dispatch(setUser({}));
  }

  return(
    <div className={styles.container}>
      <div className={styles.banner}></div>
      <div className={styles.flex_container}>
        <div className={styles.logo_container}>
          <img className={styles.logo} alt='seatriever logo' src='/images/Seatriever_Logo.png' height='30' />
        </div>
        <Modal callback={()=>setModalOpen(false)}>
          <button className={styles.user_menu_button} onClick={()=>setModalOpen(!modalOpen)}></button>
          <div className={`${styles.modal} ${modalOpen?styles.open:''}`}>
            <div className={styles.modal_header}>
              <h3>Test</h3>
              <button className={styles.button} onClick={logout}>Log out</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default TopNav;
