import classes from './messages.module.css';
import { useRef, useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/userSelector';

const Messages = ({message, currentUser}) => {
  const {senderId, text, photo} = message;
  const ref = useRef()

  
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message])
  return (
    <div
      ref={ref}
      className={`${classes.container} ${
        senderId === currentUser.uid && classes.owner
      } `}
    >
      <div className={classes.textbox}>
        <p className={classes.text}>{text}</p>
        <p className={classes.time}>{message.time}</p>
      </div>

      {photo && <img src={photo} alt="image" className={classes.photo} />}
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(Messages);