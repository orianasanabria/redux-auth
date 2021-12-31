import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updatePhotoAction, updateUserAction } from "../redux/userDucks"

const Profile = () => {
  const user = useSelector((store) => store.user.user)
  const loading = useSelector((store) => store.user.loading)

  const [name, setName] = React.useState(user.displayName)
  const [editName, setEditName] = React.useState(false)
  const [error, setError] = React.useState(false)

  const dispatch = useDispatch()

  const updateName = () => {
    if (!name.trim()) return
    dispatch(updateUserAction(name))
    setEditName(false)
  }

  const getPhoto = (img) => {
    const imageUser = img.target.files[0]
    if (!imageUser) return
    if (imageUser.type === "image/png" || imageUser.type === "image/jpg") {
      dispatch(updatePhotoAction(imageUser))
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className="mt-5 text-center">
      <div className="card">
        <div className="card-body">
          <img
            className="mb-3 img-fluid"
            src={user.photoURL}
            alt={user.displayName}
            width="150px"
          />
          <h5 className="cart-title">{user.displayName}</h5>
          <p className="card-text">{user.email}</p>
          {error && (
            <div className="alert alert-warning">
              Please upload a jpg or png file
            </div>
          )}
          <div className="d-flex align-items-center justify-content-center">
            <button
              onClick={() => setEditName(true)}
              className="btn btn-dark me-2"
            >
              Edit Name
            </button>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                style={{ display: "none" }}
                onChange={(e) => getPhoto(e)}
                disabled={loading}
              />
              <label
                className={loading ? "btn btn-dark disabled" : "btn btn-dark"}
                htmlFor="inputGroupFile01"
              >
                Edit Photo
              </label>
            </div>
          </div>
        </div>
        {loading && (
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status"></div>
            </div>
          </div>
        )}
        {editName && (
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    aria-label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      onClick={() => updateName()}
                      className="btn btn-outline-secondary"
                      type="button"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
