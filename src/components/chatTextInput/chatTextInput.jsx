import classes from './chatTextInput.module.css';
import { useState } from "react";

import { MdSend } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { arrayUnion, doc, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/firebaseConfig";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFriendsChat } from "../../redux/friendsChat/friendsChatSelector";
import { selectCurrentUser } from "../../redux/user/userSelector";


const ChatTextInput = ({ currentUser, friend }) => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const chatId = Date.now().toString();

  const handleSendMessage = async () => {
    if(text === '' || text.trim() === ''){
      return;
    }
    if(img){
      const storageRef = ref(storage, chatId);

      uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log({ url });
          await updateDoc(doc(db, "chats", friend.combinedId), {
            message: arrayUnion({
              id: chatId,
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              photo: url,
              time: new Date().toLocaleTimeString(),
            }),
          });
        });
      });
    }else{
      await updateDoc(doc(db, "chats", friend.combinedId), {
        message: arrayUnion({
          id: chatId,
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          time: new Date().toLocaleTimeString(),
        }),
      });
    };

    await updateDoc(doc(db, "myUserChats", currentUser.uid), {
      [friend.combinedId + ".lastMessage"]: {
        text: `${text.substring(0, 20)}${text.length >= 20 ? '...' : ''}`,
      },
      [friend.combinedId + ".date"]: serverTimestamp(),
    });
     await updateDoc(doc(db, "myUserChats", friend.uid), {
       [friend.combinedId + ".lastMessage"]: {
         text: `${text.substring(0, 20)}${text.length >= 20 ? "..." : ''}`,
       },
       [friend.combinedId + ".date"]: serverTimestamp(),
     });

     setText('');
     setImg(null);
  };
  return (
    <div className={classes.container}>
      <input
        type="file"
        id="img"
        style={{ display: "none" }}
        onChange={(e) => setImg(e.target.files[0])}
      />
      <label htmlFor="img" className={classes.label}>
        <GrAttachment className={classes.attach} />
      </label>
      <textarea
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={classes.text}
      />
      <MdSend className={classes.send} onClick={handleSendMessage} />
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  friend: selectFriendsChat
});
export default connect(mapStateToProps)(ChatTextInput);