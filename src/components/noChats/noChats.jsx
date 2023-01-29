import classes from './noChats.module.css';

const NoChats = () => {
  return (
    <div className={classes.container}>
      <img src="laptopImg.png" alt="photo" className={classes.photo} />
      <div className={classes.title}>Let's talk web</div>
    </div>
  );
}
 
export default NoChats;