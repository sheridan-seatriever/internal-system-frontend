import React, {useState} from 'react';
import styles from '../Styles/Login.module.css';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUser} from '../Actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const login = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/account/login', {email, password});
      dispatch(setUser(res.data));
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch(err) {
      if(err.response) {
        if(err.response.status===400) {

        } else if(err.response.status===401) {

        }
      }
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={e=>login(e)} className={styles.inner}>
        <div className={styles.form_group}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)}></input>
        </div>
        <div className={styles.form_group}>
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password"></input>
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login;