import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const CompanyDashboard = () => {
  const [toggle, setToggle] = useState(false)


  return (
    <>
    <Sidebar collapsed={toggle} width='150px' rootStyles={{borderRadius:"15px"}}>
  <Menu
    menuItemStyles={{
      button: {
        // the active class will be added automatically by react router
        // so we can use it to style the active menu item
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
      },
    }}
  >
    <MenuItem component={<button onClick={()=>{setToggle(!toggle)}}/>}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
</svg>
</MenuItem>
    <MenuItem component={<Link to="/company/home" />}> Home</MenuItem>
    <MenuItem component={<Link to="/company/home/new" />}> New Company</MenuItem>
    <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
  </Menu>
</Sidebar>
    </>
  );
};

export default CompanyDashboard;
