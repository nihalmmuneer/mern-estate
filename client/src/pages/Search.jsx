import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import rolling from "../../public/rolling.gif";
import FilteredListItem from "../components/FilteredListItem";
const Search = () => {
  const [searchSideData, setSearchSideData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSearchSideData({ ...searchSideData, type: e.target.id });
    }
    if (e.target.id === "offer") {
      setSearchSideData({
        ...searchSideData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "parking") {
      setSearchSideData({
        ...searchSideData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "furnished") {
      setSearchSideData({
        ...searchSideData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      console.log(e.target.value);
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchSideData({ ...searchSideData, sort, order });
    }
    if (e.target.id === "searchTerm") {
      setSearchSideData({ ...searchSideData, searchTerm: e.target.value });
    }
  };
  console.log(searchSideData, "searchSideData");
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchSideData?.searchTerm);
    urlParams.set("type", searchSideData?.type);
    urlParams.set("parking", searchSideData?.parking);
    urlParams.set("furnished", searchSideData?.furnished);
    urlParams.set("sort", searchSideData?.sort);
    urlParams.set("order", searchSideData?.order);
    urlParams.set("offer", searchSideData?.offer);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(location.search);
    // if(searchSideData?searchTerm||searchSideData?.type||searchSideData?.offer ||searchSideData?.parking||searchSideData?.furnished||searchSideData?.sort||searchSideData?.order){
    const searchTermUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    const offerFromUrl = urlParams.get("offer");
    if (
      searchTermUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      offerFromUrl
    ) {
      setSearchSideData({
        ...searchSideData,
        searchTerm: searchTermUrl,
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
        offer: offerFromUrl === "true" ? true : false,
      });
    }
    const fetchData = async () => {
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data, "data");
      if (data.success === false) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        setFilteredData(data);
        if (data?.length > 8) {
          console.log("more");
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setLoading(false);
      }
    };
    fetchData();
    // }
  }, [location.search]);

  const handleShowMore = async () => {
    const startIndex = filteredData?.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`, {
      method: "GET",
    });
    const data = await res.json();
    if (data.success === false) {
      setLoading(false);
      return;
    }
    if (res.ok) {
      setLoading(false);
      setFilteredData([...filteredData, ...data]);
      if (data?.length < 9) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    }
  };
  console.log(filteredData, "fileredData");
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="border-b-2 p-6 w-full max-w-2xl md:w-auto md:border-r-2 md:min-h-screen flex-shrink">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="Search..."
              className="p-3 rounded-lg w-full border"
              id="searchTerm"
              value={searchSideData?.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  onChange={handleChange}
                  checked={searchSideData?.type === "all"}
                />
                <span className="whitespace-nowrap">Rent & Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  id="rent"
                  onChange={handleChange}
                  checked={searchSideData?.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  id="sale"
                  onChange={handleChange}
                  checked={searchSideData?.type === "sale"}
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  id="offer"
                  onChange={handleChange}
                  checked={searchSideData?.offer}
                />
                <span>Offer</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <label className="font-semibold">Amenities:</label>
            <div className="flex flex-row gap-2">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={searchSideData?.parking}
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={searchSideData?.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              className="p-3 rounded-lg border"
              id="sort_order"
              onChange={handleChange}
              defaultChecked={"createdAt_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="uppercase text-white justify-center bg-slate-700 rounded-lg p-3">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 ">
        <div className="border-b-2 p-3">
          <h1 className="text-slate-700 text-2xl font-semibold mt-4 whitespace-nowrap">
            Listing results:
          </h1>
        </div>
        {loading && (
          <div className="flex justify-center">
            <img src={rolling} alt="rolling" className="w-28 h-28" />
          </div>
        )}
        {!loading && filteredData?.length === 0 && (
          <div className="p-3 text-red-500 font-semibold">
            No Posts Available..
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {!loading &&
            filteredData?.length > 0 &&
            filteredData?.map((items) => (
              <FilteredListItem filterData={items} key={items._id} />
            ))}
        </div>
        {showMore && (
          <button
            className="text-green-700 w-full p-3 cursor-pointer"
            onClick={handleShowMore}
          >
            showMore
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
