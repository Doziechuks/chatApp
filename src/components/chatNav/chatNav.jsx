import classes from "./chatNav.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFriendsChat } from "../../redux/friendsChat/friendsChatSelector";

const ChatNav = ({ friend }) => {
  const { username, photoURL } = friend;
  console.log(friend);
  return (
    <div className={classes.container}>
      <div className={classes.friendInfo}>
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
export default connect(mapStateToProps)(ChatNav);
