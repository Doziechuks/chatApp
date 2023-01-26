import classes from './App.module.css';
import { useEffect } from "react";

import SigninPage from './pages/signinPage/signinPage';
import SignupPage from './pages/signupPage/signupPage';
import HomePage from './pages/homePage/homePage';

import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  handleErrorMessage,
  handleLoading,
  handleUserAction,
} from "./redux/user/userAction";
import {
  selectCurrentUser,
  selectErrorMessage,
  selectIsLoading,
} from "./redux/user/userSelector";


function App({currentUser, errorMessage, isLoading, setCurrentUser, setErrorMessage, setIsLoading}) {
  // console.log({currentUser, errorMessage, isLoading});
  const history = useHistory()

  useEffect(()=> {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoading();
        const docRef = doc(db, "myChatAppUsers", user.uid);
        onSnapshot(docRef, (snapShot) => {
          setCurrentUser({id: snapShot.id, ...snapShot.data()})
        })
      }else{
        history.push('/signin');
      }
    });
    return () => unSubscribe();
  }, [])

  // console.log(currentUser);
  // if(isLoading){
  //   return <h1>Loading...</h1>
  // }
  return (
    <div className={classes.app}>
      <div className={classes.background} />
      <div className={classes.components}>
        <Switch>
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SigninPage />
            }
          />
          <Route
            exact
            path="/signup"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignupPage />
            }
          />
          <Route
            exact
            path="/"
            render={() =>
              !currentUser ? <Redirect to="/signin" /> : <HomePage />
            }
          />
        </Switch>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  errorMessage: selectErrorMessage,
  isLoading: selectIsLoading
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => dispatch(handleUserAction(user)),
  setErrorMessage: () => dispatch(handleErrorMessage()),
  setIsLoading: () => dispatch(handleLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
