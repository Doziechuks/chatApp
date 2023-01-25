import classes from './formInput.module.css';

const FormInput = ({...otherProps}) => {
  return (
    <input
      className={classes.formInput}
     {...otherProps}
    />
  );
}
 
export default FormInput;