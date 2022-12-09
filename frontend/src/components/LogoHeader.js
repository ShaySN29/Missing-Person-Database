import React from 'react';
import logo from '../images/logo.png';

// The function below displays the logo as a centered header
function LogoHeader() {
  return (
    <div>
        <img src={logo} className='loginImage' alt="missingLogo"/>
    </div>
  )
};

export default LogoHeader;