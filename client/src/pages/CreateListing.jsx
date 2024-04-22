import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { useState } from "react";
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CreateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    address: "",
    bathrooms: 1,
    bedrooms: 1,
    description: "",
    discountPrice: 0,
    furnished: false,
    offer: false,
    parking: false,
    regularPrice: "",
    type: "rent",
  });
  console.log(files, "files");
  const storeImage = async (files) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + files.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, files);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`uploading ${Math.round(progress)} % `);
        },
        (error) => {
          setImageUploadError(error.message);
          setUploading(false);
          reject(error);
        },
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
            setUploading(false);
          })
      );
    });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises) //This uses Promise.all() to wait for all the promises in the promises array to resolve.
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(null);
          setUploading(false);
          setError(null);
        })
        .catch((err) => {
          setImageUploadError(err.message);
          setUploading(false);
        });
    } else if (files.length < 1) {
      setImageUploadError("You have to select atleast one image..");
      setUploading(false);
      return;
    } else {
      setImageUploadError("You can only upload 6 images per listing.");
      setUploading(false);
    }
  };
  console.log(formData, "formData");
  const handleRemove = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
    setImageUploadError(null);
  };
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    } else if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (formData?.imageUrls?.length < 1) {
      setError("Upload atleast one image!!");
      setLoading(null);
      return;
    }
    if (+formData?.regularPrice < +formData?.discountedPrice) {
      setLoading(null);
      setError("Discount should be less than regular price");
      return;
    }
    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userRef: currentUser?._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      }
      if (res.ok) {
        navigate(`/listing/${data._id}`);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
 
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-6" onSubmit={handleSubmit}>
        <div className="flex-1 flex-col flex gap-4">
          {/* <form className="flex flex-col gap-4"> */}
          <div className="flex flex-col gap-6">
            <input
              type="text"
              value={formData?.name}
              placeholder="Name"
              required
              id="name"
              maxLength="60"
              minLength="5"
              className="rounded-lg p-3 border"
              onChange={handleChange}
            />
            <textarea
              type="textarea"
              value={formData?.description}
              placeholder="Description"
              id="description"
              className="p-3 border rounded-lg resize-none"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              value={formData?.address}
              placeholder="Address"
              required
              id="address"
              className="p-3 border rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex  gap-6 sm:gap-3 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={formData?.type === "sale"}
                onChange={handleChange}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={formData?.type === "rent"}
                id="rent"
                className="w-5"
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={formData?.parking}
                id="parking"
                className="w-5"
                onChange={handleChange}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={formData?.furnished}
                id="furnished"
                className="w-5"
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                checked={formData?.offer}
                className="w-5"
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex  gap-8 sm:gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                value={formData?.bedrooms}
                min="1"
                max="10"
                required
                className="border rounded-lg  border-slate-300 p-2 "
                onChange={handleChange}
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                value={formData?.bathrooms}
                min="1"
                required
                max="10"
                className="border rounded-lg  border-slate-300 p-2 "
                onChange={handleChange}
              />
              <span>Baths</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                value={formData?.regularPrice}
                required
                min="50"
                max="1000000"
                className="p-3 rounded-lg border border-slate-300 "
                onChange={handleChange}
              />
              <div className="flex  flex-col items-center">
                <p className="text-md">Regular Price </p>
                <span className="text-xs font-normal">
                  {formData?.type === "rent" ? "($/Month)" : ""}
                </span>
              </div>
            </div>
            {formData?.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={formData?.discountPrice}
                  required
                  min="0"
                  max="1000000"
                  id="discountPrice"
                  className="p-3 rounded-lg border  border-slate-300"
                  onChange={handleChange}
                />
                <div className="flex  flex-col items-center">
                  <p className="text-md">Discounted Price </p>
                  <span className="text-xs font-normal">
                    {formData?.type === "rent" ? "($/Month)" : ""}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* </form> */}
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <p className="font-semibold">
              Images:{" "}
              <span className="font-normal text-slate-600 text-sm">
                The first image will be the cover (max 6)
              </span>
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              accept="image/*"
              id="images"
              multiple
              className="border p-3 rouded-lg border-slate-300"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={(e) => handleUpload(e)}
              className="border border-green-700 text-green-700 p-3 uppercase rounded-lg shadow-md"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {imageUploadError ? (
            <span className="text-red-700">{imageUploadError} </span>
          ) : (
            ""
          )}
          {formData.imageUrls.length > 0 &&
            formData?.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between items-center listing-image-container"
              >
                <img
                  src={url}
                  alt="listing-image"
                  className="w-40 h-40 overflow-hidden object-contain rounded-lg"
                />
                <button
                  onClick={() => handleRemove(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            type="submit"
            className="text-white p-3 bg-slate-700 uppercase rounded-lg mt-3 disabled:opacity-80"
            disabled={loading || uploading}
          >
            {loading ? "creating...." : "create Listing"}
          </button>
          {error ? <p className="text-red-700 mt-4">{error}</p> : ""}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
