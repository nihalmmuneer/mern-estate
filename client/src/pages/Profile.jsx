import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
import {
  deleteFailure,
  deleteSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../redux/user/userSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorImage, setErrorImage] = useState(null);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    } else {
      return;
    }
  }, [file]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setSuccessMessage("");
        return dispatch(updateFailure(data.message));
      }
      if (res.ok) {
        dispatch(updateSuccess(data));
        setImageUploadSuccess(false);
        setSuccessMessage("Uploaded Successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setSuccessMessage("");
      return;
    }
  };
  const handleFileUpload = (file) => {
    console.log(file, "file");
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setErrorImage("File Upload Failed (File must be < 2MB)", error);
        return;
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, photo: downloadUrl });
          setImageUploadSuccess(true);
          setErrorImage(null);
        })
    );
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch(`/api/auth/sign-out`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      if (res.ok) {
        dispatch(signOutSuccess(data));
      }
    } catch (error) {
      dispatch(signOutFailure(error.message));
      return;
    }
  };
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(deleteFailure(data.message));
      }
      if (res.ok) {
        dispatch(deleteSuccess(data));
        navigate("/sign-in");
      }
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form
        className="flex  flex-col  gap-4 justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          className="w-20 h-20 rounded-full self-center object-cover mt-2 cursor-pointer"
          src={formData?.photo || currentUser?.photo}
          alt={currentUser?.username}
          onClick={() => fileRef.current?.click()}
        />
        <p className="text-center">
          {errorImage ? (
            <span className="text-red-500">{errorImage}</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">
              {`uploading image ${filePerc} %`}
            </span>
          ) : filePerc === 100 && imageUploadSuccess ? (
            <span>
              <span className="text-green-500">
                Image Uploaded successfully
              </span>
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser?.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser?.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white rounded-lg uppercase"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link to="/create-listing">
          <button
            type="button"
            className="bg-green-700 text-white p-3 rounded-lg w-full"
          >
            Create Listing
          </button>
        </Link>
      </form>
      <div className="flex text-red-700 justify-between mt-5 font-medium cursor-pointer">
        <span onClick={handleDelete}>Delete account</span>
        <span onClick={handleSignOut}>Sign out</span>
      </div>

      <p className="text-red-700 text-center">{error ? error : ""}</p>
      <p className="text-green-700 text-center">{successMessage}</p>
    </div>
  );
};

export default Profile;
