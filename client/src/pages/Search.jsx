const Search = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="border-b-2 p-6 w-full max-w-2xl md:w-auto md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="Search..."
              className="p-3 rounded-lg w-full border"
            />
          </div>
          <div className="flex gap-2">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox" id="all" className="w-5" />
                <span>Rent & Sale</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="rent" />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="sale" />
                <span>Sale</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="offer" />
                <span>Offer</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <label className="font-semibold">Amenities:</label>
            <div className="flex flex-row gap-2">
              <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5" />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="Furnished" className="w-5" />
                <span>Furnished</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select className="p-3 rounded-lg border" id="sort_order">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="uppercase text-white justify-center bg-slate-700 rounded-lg p-3">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <div className="border-b-2 p-3">
          <h1 className="text-slate-700 text-2xl font-semibold mt-4">Listing results:</h1>
        </div>
      </div>
    </div>
  );
};

export default Search;
