import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { auth, db, storage } from "../config/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

// states
const initialState = {
  loading: false,
  active: false,
}

// types
const LOADING = "LOADING"
const USER_SUCCESS = "USER_SUCCESS"
const USER_ERROR = "USER_ERROR"
const SIGNOUT = "SIGNOUT"

// reducer
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case USER_ERROR:
      return { ...initialState }
    case SIGNOUT:
      return { ...initialState }
    case USER_SUCCESS:
      return { ...state, loading: false, active: true, user: action.payload }
    default:
      return { ...state }
  }
}

// actions
export const loginAction = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  })
  try {
    const provider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, provider)
    const user = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL,
    }

    const docRef = doc(db, "users", user.email)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // when user exists on firestore
      console.log("Document data:", docSnap.data())
      dispatch({
        type: USER_SUCCESS,
        payload: docSnap.data(),
      })
      localStorage.setItem("user", JSON.stringify(docSnap.data()))
    } else {
      // when user DOESNT exists on firestore
      console.log("No such document!")
      await setDoc(docRef, user)
      dispatch({
        type: USER_SUCCESS,
        payload: user,
      })
      localStorage.setItem("user", JSON.stringify(user))
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: USER_ERROR,
    })
  }
}

export const catchUserAction = () => async (dispatch) => {
  if (localStorage.getItem("user")) {
    dispatch({
      type: USER_SUCCESS,
      payload: JSON.parse(localStorage.getItem("user")),
    })
  }
}

export const signOutAction = () => async (dispatch) => {
  signOut(auth)
  localStorage.removeItem("user")
  dispatch({
    type: SIGNOUT,
  })
}

export const updateUserAction = (updatedName) => async (dispatch, getState) => {
  dispatch({
    type: LOADING,
  })
  const { user } = getState().user
  console.log(user)

  try {
    const docRef = doc(db, "users", user.email)
    await updateDoc(docRef, {
      displayName: updatedName,
    })

    const updatedUser = {
      ...user,
      displayName: updatedName,
    }

    dispatch({
      type: USER_SUCCESS,
      payload: updatedUser,
    })

    localStorage.setItem("user", JSON.stringify(updatedUser))
  } catch (error) {
    console.log(error)
  }
}

export const updatePhotoAction =
  (updatedPhoto) => async (dispatch, getState) => {
    dispatch({
      type: LOADING,
    })
    const { user } = getState().user

    try {
      const storageRef = ref(storage, `/files/${user.email}`)
      await uploadBytes(storageRef, updatedPhoto)
      const imageURL = await getDownloadURL(storageRef)
      const docRef = doc(db, "users", user.email)
      await updateDoc(docRef, {
        photoURL: imageURL,
      })
      const updatedUser = {
        ...user,
        photoURL: imageURL,
      }
      dispatch({
        type: USER_SUCCESS,
        payload: updatedUser,
      })
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.log(error)
    }
  }
