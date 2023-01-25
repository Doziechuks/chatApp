import classes from "./signupPage.module.css";

import FormInput from "../../components/formInput/formInput.component";
import FormButton from "../../components/formButton/formButton.component";

const SignupPage = () => {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>create an account</h2>
      <form className={classes.formcontainer}>
        <FormInput type="text" placeholder="username" required />
        <FormInput type="email" placeholder="email" required />
        <FormInput type="password" placeholder="password" required />
        <FormInput type="password" placeholder="confirm password" required />
        <FormButton type="submit">sign up</FormButton>
      </form>
      <p>
        already have an account? <span>signin</span>
      </p>
    </div>
  );
};

export default SignupPage;
