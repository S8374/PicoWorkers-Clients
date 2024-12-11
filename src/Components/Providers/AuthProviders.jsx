import { createContext, useEffect, useState } from "react"

import auth from "../../Firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { UseAxiosPublic } from "../../Hooks/useAxiosPublic";
export const AuthContext = createContext(null)
export const AuthProviders = ({children}) => {
    const [user , setUser] = useState(null) ;
    const [loading , setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
const axiosPublic = UseAxiosPublic()
    const signUp = (email , password) => {
      setLoading(true);
        return createUserWithEmailAndPassword(auth , email , password)
    }
    const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
          displayName: name, photoURL: photo
      });
  }

    const signIn = (email , password)=> {
      setLoading(true);
      return signInWithEmailAndPassword(auth , email , password)
    }


    const googleSignIn = ()=> {
      setLoading(true);
      return signInWithPopup (auth , googleProvider)
    }


    const logOut = () => {
      setLoading(true);
      return signOut(auth);
  }

useEffect(()=>{
  const unSubscribe = onAuthStateChanged(auth , currentUser =>{
    console.log('current user' , currentUser)

    setUser(currentUser);
    if (currentUser) {
      // get token and store client
      const userInfo = { email: currentUser.email };
      axiosPublic.post('/jwt', userInfo)
          .then(res => {
              if (res.data.token) {
                  localStorage.setItem('access-token', res.data.token);
                  setLoading(false);
              }
          })
  }
  else {
      // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
      localStorage.removeItem('access-token');
      setLoading(false);
  }



    
  })
  return ()=>{
    unSubscribe();
  }
},[axiosPublic])

    const authInfo = {
        user ,
        signUp, //ok
        loading,
        googleSignIn,
        signIn,
        logOut,
        updateUserProfile //ok
    }
  return (
    <AuthContext.Provider value={authInfo}>
{children}
    </AuthContext.Provider>
  )
}
