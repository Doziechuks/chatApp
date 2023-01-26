import classes from './sidebar.module.css';

import SidebarNav from '../sidebarNav/sidebarNav';
import SidebarSearch from '../sidebarSearch/sidebarSearch';
import MyProfile from '../myProfile/myProfile';

const Sidebar = () => {
  return ( 
    <div className={classes.container}>
      <SidebarNav />
      <SidebarSearch />
      <MyProfile />
    </div>
   );
}
 
export default Sidebar;