import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import app from "../firebase";
const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [formData, setFormData] = useState({
    imageUrls: [],
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
          reject(error);
        },
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          })
      );
    });
  };
  const handleSubmit = (e) => {
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
        })
        .catch((err) => {
          setImageUploadError(err.message);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing..");
      return;
    }
  };
  const handleRemove = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
    setImageUploadError(null);
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create a Listing
      </h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                id="name"
                maxLength="60"
                minLength="10"
                className="rounded-lg p-3 border"
              />
              <textarea
                type="text"
                placeholder="Description"
                id="description"
                className="p-3 border rounded-lg resize-none"
              />
              <input
                type="text"
                placeholder="Address"
                id="address"
                className="p-3 border rounded-lg"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5" />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5" />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5" />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5" />
                <span>Furnished</span>
              </div>

              <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5" />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  className="border rounded-lg  border-slate-300 p-2 "
                />
                <span>Beds</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  className="border rounded-lg  border-slate-300 p-2 "
                />
                <span>Baths</span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  className="p-3 rounded-lg w-24 border "
                />
                <div className="flex  flex-col items-center">
                  <p className="text-md">Regular Price </p>
                  <span className="text-xs font-normal">($/Month)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountedPrice"
                  className="p-3 rounded-lg w-24 border "
                />
                <div className="flex  flex-col items-center">
                  <p className="text-md">Discounted Price </p>
                  <span className="text-xs font-normal">($/Month)</span>
                </div>
              </div>
            </div>
          </form>
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
              onClick={(e) => handleSubmit(e)}
              className="border border-green-700 text-green-700 p-3 uppercase"
            >
              {uploading ? "Uploading" : "Upload"}
            </button>
          </div>
          <button
            type="button"
            className="text-white p-3 bg-slate-700 uppercase rounded-lg mt-3"
          >
            create listing
          </button>
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
        </div>
      </div>
    </main>
  );
};

export default CreateListing;
