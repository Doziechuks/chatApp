import classes from './sidebar.module.css';

import SidebarNav from '../sidebarNav/sidebarNav';
import SidebarSearch from '../sidebarSearch/sidebarSearch';
import SidebarFriends from '../sidebarFriends/sidebarFriends';
import MyProfile from '../myProfile/myProfile';

const Sidebar = () => {
  return ( 
    <div className={classes.container}>
      <SidebarNav />
      <SidebarSearch />
      <SidebarFriends />
      <MyProfile />
    </div>
   );
}
 
export default Sidebar;