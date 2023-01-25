import classes from './signinPage.module.css';

import FormInput from '../../components/formInput/formInput.component';
import FormButton from '../../components/formButton/formButton.component';

const SigninPage = () => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>signin to your account</h2>
      <form className={classes.formcontainer}>
        <FormInput type="email" placeholder="email" required />
        <FormInput type="password" placeholder="password" required />
        <FormButton type="submit">sign in</FormButton>
        <div className={classes.forgotpassword}>forgot password?</div>
      </form>
      <p>
        don't have an account? <span>signup</span>
      </p>
    </div>
  );
}
 
export default SigninPage;