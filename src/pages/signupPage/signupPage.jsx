import classes from "./signupPage.module.css";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import FormInput from "../../components/formInput/formInput.component";
import FormButton from "../../components/formButton/formButton.component";

import { auth, storage, db } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const SignupPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setError('passwords does not match');
      return;
    }
    if (displayName.trim() === "" || password.trim() === "") {
      setError("An input field is empty");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      const storageRef = ref(storage, displayName);
      uploadBytesResumable(storageRef, photo).then(
        () => {
          getDownloadURL(storageRef).then(async (url) => {
            console.log({url});
            await updateProfile(user, {
              displayName,
              photoURL: url
            });
            const createdDate = new Date().toDateString();
            await setDoc(doc(db, 'myChatAppUsers', user.uid), {
              uid: user.uid,
              displayName: displayName.toLowerCase(),
              email,
              photoURL: url,
              createdDate,
              username: displayName.split(' ')[0]
            });

            await setDoc(doc(db, "myUserChats", user.uid), {});
            history.push("/letstalk");
          });
        }
      );
      setDisplayName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoto(null);
    } catch (error) {
      console.log(error.message);
      switch (error.message) {
        case "Firebase: Error (auth/network-request-failed).":
          return setError("No internet connection");
        case "Firebase: Error (auth/email-already-in-use).":
          return setError("Email already exist");
        default:
          return setError("Something went wrong");
      }
    }
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>create an account</h2>
      {error && <h4>{error}</h4>}
      <form className={classes.formcontainer} onSubmit={handleSubmit}>
        <FormInput
          type="text"
          placeholder="username"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
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
        <FormInput
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <FormInput
          type="file"
          id="file"
          isFile
          onChange={(e) => setPhoto(e.target.files[0])}
          required
        />
        <label htmlFor="file" className={classes.photolabel}>
          choose profile photo
        </label>
        <FormButton type="submit">sign up</FormButton>
      </form>
      <p>
        already have an account?{" "}
        <Link className={classes.switchAccount} to="/signin">
          signin
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
