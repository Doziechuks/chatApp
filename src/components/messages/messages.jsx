import classes from './messages.module.css';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/userSelector';

const Messages = ({message, currentUser}) => {
  // console.log(message);
  const {senderId, text, photo} = message;
  return (
    <div className={`${classes.container} ${senderId === currentUser.uid && classes.owner} `}>
      <p className={classes.text}>{text}</p>
      {photo && <img src={photo} alt="image" className={classes.photo} />}
    </div>
  );
}
 
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
export default connect(mapStateToProps)(Messages);