import classes from './sidebarNav.module.css';

import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from 'react';

import { auth } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

import { connect } from 'react-redux';
import { handleHideMyProfile } from '../../redux/profile/profileAction';
import { selectCurrentUser } from '../../redux/user/userSelector';
import { createStructuredSelector } from 'reselect';

const SidebarNav = ({setHideMyProfile, currentUser}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={classes.container}>
      <img src={currentUser.photoURL} alt="photo" className={classes.profilePicture} onClick={() => setHideMyProfile()} />
      <div className={classes.navcontent}>
        <h3>{currentUser.username}</h3>
        <div className={`${classes.dotBox} ${show && classes.showBoarder}`} onClick={() => {setShow(!show)}}>
          <BsThreeDotsVertical className={classes.dots} />
        </div>
      </div>
      {show && (
        <div className={classes.profileBox}>
          <div onClick={ () => {setShow(!show); setHideMyProfile()} }>Profile</div>
          <div onClick={ () => {setShow(!show); signOut(auth);} }>Log out</div>
        </div>
      )}
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = (dispatch) => ({
  setHideMyProfile: () => dispatch(handleHideMyProfile()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SidebarNav);