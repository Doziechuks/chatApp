import classes from './messages.module.css';
import { useRef, useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/userSelector';
import { ref } from 'firebase/storage';

const Messages = ({message, currentUser}) => {
  const {senderId, text, photo} = message;

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message])
  return (
    <div ref={ref} className={`${classes.container} ${senderId === currentUser.uid && classes.owner} `}>
      <p className={classes.text}>{text}</p>
      {photo && <img src={photo} alt="image" className={classes.photo} />}
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(Messages);