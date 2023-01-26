import classes from './myProfile.module.css';

import { BiLeftArrowAlt } from "react-icons/bi";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMyProfile } from '../../redux/profile/profileSelector';
import { handleHideMyProfile } from '../../redux/profile/profileAction';
import { selectCurrentUser } from '../../redux/user/userSelector';

const MyProfile = ({hideMyProfile, setHideMyProfile, currentUser}) => {
  // console.log(currentUser.photoURL);
  return (
    <div
      className={`${classes.container} ${
        hideMyProfile && classes.showContainer
      }`}
    >
      <div className={classes.myProfileNav}>
        <div className={classes.profileicon} onClick={() => setHideMyProfile()}>
          <BiLeftArrowAlt className={classes.icon} />
        </div>
        <div className={classes.profiletitle}>profile</div>
      </div>
      <div className={classes.profileInfo}>
        <div className={classes.background} />
        <img
          src={currentUser.photoURL}
          alt="photo"
          className={classes.profilePhoto}
        />
        <div className={classes.info}>
          <h4>{currentUser.displayName}</h4>
          <p>Email: {currentUser.email}</p>
          <p>Joined: {currentUser.createdDate}</p>
        </div>
      </div>
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  hideMyProfile: selectMyProfile,
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
  setHideMyProfile: () => dispatch(handleHideMyProfile()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);