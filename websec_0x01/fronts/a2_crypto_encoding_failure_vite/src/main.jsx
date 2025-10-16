import React from 'react'
import ReactDOM from 'react-dom/client'
import Profile from './Profile';
import Login from './Login';

const pathname = window.location.pathname.split('/');
const current_path = pathname[pathname.length - 1]

ReactDOM.createRoot(document.getElementById('main')).render(
  <React.StrictMode>
    { current_path == 'login' ? <Login /> : <Profile /> }
  </React.StrictMode>
);
