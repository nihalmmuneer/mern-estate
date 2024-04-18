const CreateListing = () => {
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
              accept="images/*"
              multiple
              className="border p-3 rouded-lg border-slate-300"
            />
            <button
              type="button"
              className="border border-green-700 text-green-700 p-3 uppercase"
            >
              Upload
            </button>
          </div>
          <button
            type="button"
            className="text-white p-3 bg-slate-700 uppercase rounded-lg mt-3"
          >
            create listing
          </button>
        </div>
      </div>
    </main>
  );
};

export default CreateListing;
