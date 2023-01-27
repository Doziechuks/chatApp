import classes from './chatsContainer.module.css';

import ChatNav from '../chatNav/chatNav';

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFriendsChat } from "../../redux/friendsChat/friendsChatSelector";

const ChatsContainer = ({friend}) => {
  return (
    <div className={classes.container}>
      {!friend ? (
        <div>no chats</div>
      ) : (
        <div className={classes.box}>
          <ChatNav />
        </div>
      )}
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  friend: selectFriendsChat,
});
export default connect(mapStateToProps)(ChatsContainer);