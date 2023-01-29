import classes from './chatsContainer.module.css';

import ChatNav from '../chatNav/chatNav';
import ChatTextInput from '../chatTextInput/chatTextInput';
import MessageBody from '../messageBody/messageBody';
import FriendsProfile from '../friendProfile/friendProfile';

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFriendProfile } from '../../redux/profile/profileSelector';

const ChatsContainer = ({ friendProfile }) => {
  console.log(friendProfile);
  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.box} ${friendProfile && classes.show}`}>
        <ChatNav />
        <MessageBody />
        <ChatTextInput />
      </div>
      <FriendsProfile />
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  friendProfile: selectFriendProfile
});

export default connect(mapStateToProps)(ChatsContainer);
