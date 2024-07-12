import React from 'react';
import SidebarButton from './SidebarButton'; 
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Start = () => {
  return (
    <div>
      <SidebarButton /> 
      <Sidebar />
      <div id="detail">
        <Outlet/>
      </div>
      
    </div>
  );
};

export default Start;
