import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../config/firebase"

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
    dispatch({
      type: USER_SUCCESS,
      payload: {
        uid: res.user.uid,
        email: res.user.email,
      },
    })
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: res.user.uid,
        email: res.user.email,
      })
    )
  } catch (error) {
    console.log(error)
    dispatch({
      typer: USER_ERROR,
    })
  }
}

export const catchUserAction = () => async (dispatch) => {
	if(localStorage.getItem('user')){
		dispatch({
			type: USER_SUCCESS,
			payload: JSON.parse(localStorage.getItem('user'))
		})
	}
}

export const signOutAction = () => async (dispatch) => {
	signOut(auth)
	localStorage.removeItem('user')
	dispatch({
		type: SIGNOUT
	})
}
