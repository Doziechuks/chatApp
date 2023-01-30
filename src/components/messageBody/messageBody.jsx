import classes from "./messageBody.module.css";
import { useState, useEffect, useRef } from "react";

import Messages from "../messages/messages";

import { db } from "../../firebase/firebaseConfig";
import { onSnapshot, doc } from "firebase/firestore";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectFriendsChat } from "../../redux/friendsChat/friendsChatSelector";

const MessageBody = ({ friend }) => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const handleGetMessage = () => {
      const getSnapshot = onSnapshot(
        doc(db, "chats", friend.combinedId),
        (docSnapshot) => {
          docSnapshot.exists() && setMessage(docSnapshot.data().message);
        }
      );
      return () => getSnapshot();
    };
    friend.combinedId && handleGetMessage();
  }, [friend.combinedId]);

  return (
    <div className={classes.container}>
      {message && message.map((info, index) => {
        return <Messages key={info.id + index} message={info} />;
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  friend: selectFriendsChat,
});
export default connect(mapStateToProps)(MessageBody);
