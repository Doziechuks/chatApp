import classes from './formInput.module.css';

const FormInput = ({isFile, ...otherProps}) => {
  return <input className={`${classes.formInput} ${isFile && classes.hide}`} {...otherProps} />;
}
 
export default FormInput;