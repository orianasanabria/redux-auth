import axios from "axios"

// constants (state)
const initialData = {
  count: 0,
  previous: null,
  next: null,
  results: [],
}

// types
const GET_POKE_SUCCESS = "GET_POKE_SUCCESS"
const PAGE_POKE_SUCCESS = "PAGE_POKE_SUCCESS"
const INFO_POKE_SUCCESS = "INFO_POKE_SUCCESS"

// reducer
export default function pokeReducer(state = initialData, action) {
  switch (action.type) {
    case GET_POKE_SUCCESS:
      return { ...state, ...action.payload }
    case PAGE_POKE_SUCCESS:
      return { ...state, ...action.payload }
    case INFO_POKE_SUCCESS:
      return { ...state, details: action.payload }
    default:
      return state
  }
}

// actions

export const infoPokeAction =
  (url = "https://pokeapi.co/api/v2/pokemon/1/") =>
  async (dispatch) => {
    if(localStorage.getItem(url)){
      dispatch({
        type: INFO_POKE_SUCCESS,
        payload: JSON.parse(localStorage.getItem(url)),
      })  
    }
    try {
      const res = await axios.get(url)
      dispatch({
        type: INFO_POKE_SUCCESS,
        payload: {
          name: res.data.name,
          weight: res.data.weight,
          xp: res.data.base_experience,
          img: res.data.sprites.front_default,
        },
      })
      localStorage.setItem(url, JSON.stringify({
        name: res.data.name,
        weight: res.data.weight,
        xp: res.data.base_experience,
        img: res.data.sprites.front_default,
      }))
    } catch (error) {
      console.log(error)
    }
  }

export const getPokeAction = () => async (dispatch) => {
  if (localStorage.getItem("offset=0")) {
    dispatch({
      type: GET_POKE_SUCCESS,
      payload: JSON.parse(localStorage.getItem("offset=0")),
    })
    return
  }
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    )
    dispatch({
      type: GET_POKE_SUCCESS,
      payload: res.data,
    })
    localStorage.setItem("offset=0", JSON.stringify(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const nextPokeAction = () => async (dispatch, getState) => {
  const { next } = getState().pokemons
  if (localStorage.getItem(next)) {
    console.log("local")
    dispatch({
      type: GET_POKE_SUCCESS,
      payload: JSON.parse(localStorage.getItem(next)),
    })
    return
  }
  try {
    console.log("api")
    const res = await axios.get(next)
    console.log(res.data)
    dispatch({
      type: PAGE_POKE_SUCCESS,
      payload: res.data,
    })
    localStorage.setItem(next, JSON.stringify(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const previousPokeAction = () => async (dispatch, getState) => {
  const { previous } = getState().pokemons
  if (localStorage.getItem(previous)) {
    console.log("local")
    dispatch({
      type: GET_POKE_SUCCESS,
      payload: JSON.parse(localStorage.getItem(previous)),
    })
    return
  }
  try {
    const res = await axios.get(previous)
    console.log(res.data)
    dispatch({
      type: PAGE_POKE_SUCCESS,
      payload: res.data,
    })
    localStorage.setItem(previous, JSON.stringify(res.data))
  } catch (error) {
    console.log(error)
  }
}
