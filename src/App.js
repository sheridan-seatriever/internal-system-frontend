import React from 'react';
import Main from './Wrappers/Main';
import Login from './Wrappers/Login';
import StudioPlanner from './Views/StudioPlanner/StudioPlanner';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from './Actions';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  if(!user||!user.token) {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch(setUser(user));
  }

  if(true) {
    return (
      <Main>
        <StudioPlanner />
      </Main>
    );
  } else {
    return <Login />
  }
}

export default App;
