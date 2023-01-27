import classes from './sidebarFriends.module.css';

import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/userSelector';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const SidebarFriends = ({currentUser}) => {

  const [friend, setFriend] = useState([]);
  // const [obj, setObj] = useState([]);

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
      {Object.entries(friend).map((myFriend) => {
        const {photoURL, username} = myFriend[1].friendInfo;
        return (
          <div className={classes.founduser} key={myFriend[0]}>
            <img
              src={photoURL}
              alt="photo"
              className={classes.userPhoto}
            />
            <div className={classes.infoBox}>
              <p>{username}</p>
              <p className={classes.lastMessage}>last message</p>
            </div>
          </div>
        );
        
})}
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(SidebarFriends);