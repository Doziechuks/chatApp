import classes from './friendProfile.module.css';

import { BiLeftArrowAlt } from "react-icons/bi";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFriendProfile } from "../../redux/profile/profileSelector";
import { selectFriendsChat } from '../../redux/friendsChat/friendsChatSelector';
import { handleHideFriendProfile } from "../../redux/profile/profileAction";

const FriendsProfile = ({ friendProfile, friend, setFriendPofile }) => {
  console.log(friend);
  return (
    <div className={`${classes.container} ${friendProfile && classes.show}`}>
      <div className={classes.myProfileNav}>
        <div className={classes.profileicon} onClick={() => setFriendPofile()}>
          <BiLeftArrowAlt className={classes.icon} />
        </div>
        <div className={classes.profiletitle}>contact info</div>
      </div>
      <div className={classes.profileInfo}>
        <div className={classes.background} />
        <img
          src={friend.photoURL}
          alt="photo"
          className={classes.profilePhoto}
        />
        <div className={classes.info}>
          <h4>{friend.username}</h4>
          <p>Email: {friend.email}</p>
          <p>Joined: {friend.createdDate}</p>
        </div>
      </div>
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  friendProfile: selectFriendProfile,
  friend: selectFriendsChat,
});
const mapDispatchToProps = (dispatch) => ({
  setFriendPofile: () => dispatch(handleHideFriendProfile()),
});
export default connect(mapStateToProps, mapDispatchToProps)(FriendsProfile);