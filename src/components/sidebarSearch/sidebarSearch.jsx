import classes from "./sidebarSearch.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";

const SidebarSearch = ({ currentUser }) => {
  const [username, setUsername] = useState("");
  const [foundFriend, setFoundFriend] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async () => {
    const queryRef = query(
      collection(db, "myChatAppUsers"),
      where("username", "==", username)
    );

    try {
      const querySnapshot = await getDocs(queryRef);
      querySnapshot.forEach((doc) => {
        setFoundFriend(doc.data());
      });
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelectFoundFriend = async () => {
    const combinedId = currentUser.uid + foundFriend.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      if(!res.exists()){
        await setDoc(doc(db, 'chats', combinedId), {messages: []});
        
        //update currentUsers 'myUserChats' doc
        await updateDoc(doc(db, "myUserChats", currentUser.uid), {
          [combinedId+'.friendInfo']:{
          uid: foundFriend.uid,
          username: foundFriend.username,
          photoURL: foundFriend.photoURL,
          email: foundFriend.email,
          createdDate: foundFriend.createdDate,
          combinedId,
          },
          [combinedId+'.date']: serverTimestamp(),
        });

        //update foundFriends 'myUserChats' doc
        await updateDoc(doc(db, "myUserChats", foundFriend.uid), {
          [combinedId+'.friendInfo']: {
          uid: currentUser.uid,
          username: currentUser.username,
          photoURL: currentUser.photoURL,
          email: currentUser.email,
          createdDate: currentUser.createdDate,
          },
          [combinedId+'.date']: serverTimestamp(),
          
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    setFoundFriend(null);
    setUsername('');
  };
  
  return (
    <div className={classes.container}>
      <div className={classes.searchbox}>
        <AiOutlineSearch
          className={classes.searchIcon}
          onClick={handleSearch}
        />
        <input
          type="text"
          placeholder="Search or start a new chat"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          className={classes.search}
        />
      </div>
      {error && <p>user not founder</p>}
      {foundFriend && (
        <div className={classes.founduser} onClick={handleSelectFoundFriend}>
          <img
            src={foundFriend.photoURL}
            alt="photo"
            className={classes.userPhoto}
          />
          <p>{foundFriend.username}</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(SidebarSearch);
