import classes from './sidebarFriends.module.css';

import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/userSelector';
import { selectFriendsChat } from '../../redux/friendsChat/friendsChatSelector';
import { handleFriendsChat } from '../../redux/friendsChat/friendsChatAction';
import { handleShowChatContainer } from '../../redux/profile/profileAction';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const SidebarFriends = ({ currentUser, setfoundFriend, setChatContainer }) => {
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    const handleGetChats = () => {
     const docRef = doc(db, "myUserChats", currentUser.uid);
     const getSnapShot = onSnapshot(docRef, (querySnapShot) => {
      setFriend(querySnapShot.data())
     });
      return () => getSnapShot();
    }

    currentUser.uid && handleGetChats();
  }, [currentUser.uid])

  return (
    <div className={classes.container}>
      { friend && Object.entries(friend)?.sort((a,b) => b[1].date - a[1].date).map((myFriend) => {
        return (
          <div className={classes.founduser} key={myFriend[0]} onClick={() => {setfoundFriend(myFriend[1].friendInfo); setChatContainer()}} >
            <img
              src={myFriend[1].friendInfo.photoURL}
              alt="photo"
              className={classes.userPhoto}
            />
            <div className={classes.infoBox}>
              <p>{myFriend[1].friendInfo.username}</p>
              <p className={classes.lastMessage}>{myFriend[1].lastMessage?.text}</p>
            </div>
          </div>
        );
        
})}
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  found: selectFriendsChat
});
const mapDispatchToProps = dispatch => ({
  setfoundFriend: (friend) => dispatch(handleFriendsChat(friend)),
  setChatContainer: () => dispatch(handleShowChatContainer())
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarFriends);