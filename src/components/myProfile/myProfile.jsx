import classes from './myProfile.module.css';
import { useState, useEffect } from "react";

import { BiLeftArrowAlt } from "react-icons/bi";
import { MdEdit } from "react-icons/md";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMyProfile } from '../../redux/profile/profileSelector';
import { handleHideMyProfile } from '../../redux/profile/profileAction';
import { selectCurrentUser } from '../../redux/user/userSelector';

import { storage, db } from '../../firebase/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const MyProfile = ({hideMyProfile, setHideMyProfile, currentUser}) => {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      setError(false);
    }, 5000);

    return () => clearInterval(timerId)
  }, [])

  const handleChangeProfilePhoto = async () => {
    try {
      const storageRef = ref(storage, currentUser.displayName);
      uploadBytesResumable(storageRef, photo).then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          await updateDoc(doc(db, "myChatAppUsers", currentUser.uid), {
            photoURL: url,
          });
        });
      });
      setPhoto(null);
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };
  return (
    <div
      className={`${classes.container} ${
        hideMyProfile && classes.showContainer
      }`}
    >
      <div className={classes.myProfileNav}>
        <div className={classes.profileicon} onClick={() => setHideMyProfile()}>
          <BiLeftArrowAlt className={classes.icon} />
        </div>
        <div className={classes.profiletitle}>profile</div>
      </div>
      <div className={classes.profileInfo}>
        <div className={classes.background}>
          <input
            type="file"
            id="file"
            onChange={(e) => setPhoto(e.target.files[0])}
            style={{ display: "none" }}
          />
          <label
            htmlFor="file"
            className={classes.label}
            onClick={photo && handleChangeProfilePhoto()}
          >
            <MdEdit className={classes.editIcon} />
          </label>
        </div>
        <img
          src={currentUser.photoURL}
          alt="photo"
          className={classes.profilePhoto}
        />
        <div className={classes.info}>
          {error && <p>failed to update please try again</p>}
          <h4>{currentUser.displayName}</h4>
          <p>Email: {currentUser.email}</p>
          <p>Joined: {currentUser.createdDate}</p>
        </div>
      </div>
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  hideMyProfile: selectMyProfile,
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
  setHideMyProfile: () => dispatch(handleHideMyProfile()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);