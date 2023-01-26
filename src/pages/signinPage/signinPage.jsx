import classes from './signinPage.module.css';

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';

import FormInput from '../../components/formInput/formInput.component';
import FormButton from '../../components/formButton/formButton.component';
import { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';


const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await signInWithEmailAndPassword(auth, email, password);
          setEmail("");
          setPassword("");
          history.push("/letstalk");
        } catch (error) {
          console.log({ error: error.message });
          switch (error.message) {
            case "Firebase: Error (auth/network-request-failed).":
              return setError("No internet connection");
            case "Firebase: Error (auth/user-not-found).":
              return setError("Email does not exist");
            default:
              return setEmail("Something went wrong");
          }
        }
  }
  const handlePsswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email)
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error.message);
      
      switch(error.message){
        case 'Firebase: Error (auth/missing-email).':
          return setError('Please add your email');
        default:
          return setError("something went wrong");
      }
    }
  }
  useEffect(() => {
    let timerId = setInterval(() => {
      setError("");
    }, 5000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>signin to your account</h2>
      {error && <h4>{error}</h4>}
      <form className={classes.formcontainer} onSubmit={handleSubmit}>
        <FormInput
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormButton type="submit">sign in</FormButton>
        <div className={classes.forgotpassword} onClick={handlePsswordReset}>forgot password?</div>
      </form>
      <p>
        don't have an account?{" "}
        <Link className={classes.switchAccount} to="signup">
          signup
        </Link>
      </p>
    </div>
  );
}
 
export default SigninPage;