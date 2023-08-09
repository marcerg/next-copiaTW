import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyCh02LHPYbWckzq_sGV_EXB-ewQkaw95Ek",
    authDomain: "devter-f0751.firebaseapp.com",
    projectId: "devter-f0751",
    storageBucket: "devter-f0751.appspot.com",
    messagingSenderId: "568531539897",
    appId: "1:568531539897:web:1f24aea2737e201119c868",
    measurementId: "G-D2RN8BD5HG"
}

!firebase.apps.length &&
  firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const {displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase
    .auth()
    .onAuthStateChanged(user => {
      const normalizedUser = mapUserFromFirebaseAuthToUser(user)
      onChange(normalizedUser)
    })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
}