import classes from "./chatNav.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFriendsChat } from "../../redux/friendsChat/friendsChatSelector";
import { handleHideFriendProfile } from "../../redux/profile/profileAction";

const ChatNav = ({ friend, setFriendPofile }) => {
  const { username, photoURL } = friend;
  // console.log(friend);
  return (
    <div className={classes.container}>
      <div className={classes.friendInfo} onClick={() => setFriendPofile()}>
        <img src={photoURL} alt="photo" className={classes.friendPhoto} />
        <div className={classes.username}>{username}</div>
      </div>
      <div className={classes.dotBox}>
        <BsThreeDotsVertical className={classes.dots} />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  friend: selectFriendsChat,
});
const mapDispatchToProps = (dispatch) => ({
  setFriendPofile: () => dispatch(handleHideFriendProfile()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatNav);
