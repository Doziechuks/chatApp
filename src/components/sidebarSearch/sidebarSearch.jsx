import classes from './sidebarSearch.module.css';
import { AiOutlineSearch } from "react-icons/ai";
import FormInput from '../formInput/formInput.component';

const SidebarSearch = () => {
  return ( 
    <div className={classes.container}>
      <div className={classes.searchbox}>
        <AiOutlineSearch className={classes.searchIcon} />
        <input type="text" placeholder='Search or start a new chat' className={classes.search} />
      </div>
      <div className={classes.founduser}>
        <img src="" alt="photo" className={classes.usePhoto} />
        <p>chuka</p>
      </div>
    </div>
   );
}
 
export default SidebarSearch;