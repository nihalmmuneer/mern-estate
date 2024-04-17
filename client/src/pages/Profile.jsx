import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";
const Profile = () => {
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(null);
  const [errorImage, setErrorImage] = useState(null);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    } else {
      return;
    }
  }, [file]);

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
          setErrorImage(null);
        })
    );
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex  flex-col  gap-4 justify-center">
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
          ) : filePerc === 100 ? (
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
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase">
          Update
        </button>
      </form>
      <div className="flex text-red-700 justify-between mt-5 font-medium">
        <span>Delete account</span>
        <span>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
