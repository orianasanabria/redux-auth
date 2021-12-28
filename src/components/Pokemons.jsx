import React from "react"

import { useDispatch, useSelector } from "react-redux"
import {
  getPokeAction,
  nextPokeAction,
  previousPokeAction,
  infoPokeAction,
} from "../redux/pokeDucks"
import Details from "./Details"

const Pokemons = () => {
  const dispatch = useDispatch()
  const { results } = useSelector((store) => store.pokemons)
  const { next } = useSelector((store) => store.pokemons)
  const { previous } = useSelector((store) => store.pokemons)

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(getPokeAction())
    }
    fetchData()
  }, [dispatch])

  return (
    <div className="row">
      <div className="col-md-6">
        <h3 className="display-5">Pokemons</h3>
        <ul className="list-group my-4">
          {results.map((el) => (
            <li key={el.name} className="list-group-item text-capitalize">
              {el.name}
              <button
                onClick={() => dispatch(infoPokeAction(el.url))}
                className="btn btn-outline-dark btn-sm float-end px-2"
              >
                +
              </button>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between mb-5">
          {results.length === 0 && (
            <button
              className="btn btn-dark"
              onClick={() => dispatch(getPokeAction())}
            >
              Get Pokemons
            </button>
          )}
          {previous && (
            <button
              className="btn btn-dark"
              onClick={() => dispatch(previousPokeAction())}
            >
              Previous
            </button>
          )}
          {next && (
            <button
              className="btn btn-dark"
              onClick={() => dispatch(nextPokeAction())}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="col-md-6">
        <h3 className="display-5">Details</h3>
        <Details />
      </div>
    </div>
  )
}

export default Pokemons
