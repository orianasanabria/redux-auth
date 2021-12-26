import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { infoPokeAction } from "../redux/pokeDucks"

const Details = () => {
	const dispatch = useDispatch()

	React.useEffect(() => {
		const fetchData = () => {
			dispatch(infoPokeAction())
		}
		fetchData()
	}, [dispatch])

	const {details} = useSelector(store => store.pokemons)

  return details ? (
    <div className="card mt-5 text-center">
      <div className="card-body">
				<img src={details.img} className="img-fluid" />
        <div className="card-title text-uppercase fw-bold">{details.name}</div>
        <p className="card-text">{details.weight}kg | {details.xp}xp</p>
      </div>
    </div>
  ) : null
}

export default Details
