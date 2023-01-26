import classes from './homePage.module.css';

import Sidebar from '../../components/sidebar/sidebar';
import ChatsContainer from '../../components/chatsContainer/chatsContainer';

const HomePage = () => {
  return ( 
    <div className={classes.container}>
      <Sidebar />
      <ChatsContainer />
    </div>
   );
}
 
export default HomePage;