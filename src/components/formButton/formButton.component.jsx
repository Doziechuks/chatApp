import classes from './formButton.module.css';

const FormButton = ({children, ...otherProps}) => {
  return <button className={classes.customButton} {...otherProps}>{children}</button>;
}
 
export default FormButton;