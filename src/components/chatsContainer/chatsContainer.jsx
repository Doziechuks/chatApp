import classes from "./chatsContainer.module.css";

import ChatNav from "../chatNav/chatNav";
import ChatTextInput from "../chatTextInput/chatTextInput";
import MessageBody from "../messageBody/messageBody";
import FriendsProfile from "../friendProfile/friendProfile";
import NoChats from "../noChats/noChats";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectFriendProfile,
  selectChatContainer,
} from "../../redux/profile/profileSelector";

const ChatsContainer = ({ friendProfile, chatContainer }) => {
  return (
    <div className={`${classes.container}`}>
      {chatContainer ? (
        <div className={`${classes.box} ${friendProfile && classes.show}`}>
          <ChatNav />
          <MessageBody />
          <ChatTextInput />
        </div>
      ) : (
       <NoChats />
      )}
      <FriendsProfile />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  friendProfile: selectFriendProfile,
  chatContainer: selectChatContainer,
});

export default connect(mapStateToProps)(ChatsContainer);
