import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css";
import { Navigation } from "swiper/modules";
import FilteredListItem from "../components/FilteredListItem";

const Home = () => {
  SwiperCore.use(Navigation);
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/listing/get?offer=true&limit=4", {
        method: "GET",
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      if (res.ok) {
        setOfferListings(data);
        fetchRentData();
      }
    };
    fetchData();
    const fetchRentData = async () => {
      const res = await fetch("/api/listing/get?type=rent&limit=4", {
        method: "GET",
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      if (res.ok) {
        setRentListings(data);
        fetchSaleListings();
      }
    };
    const fetchSaleListings = async () => {
      const res = await fetch("/api/listing/get?type=sale&limit=4", {
        method: "GET",
      });
      const data = await res.json();
      if (data.success === "false") {
        return;
      }
      if (res.ok) {
        setSaleListings(data);
      }
    };
  }, []);
  return (
    <div>
      <div className="p-6 sm:p-16 my-7 sm:max-w-6xl mx-auto">
        <div className="flex flex-col gap-6">
          <h1 className=" text-3xl sm:text-6xl text-slate-700 font-bold">
            Find your next <span className="text-slate-500">perfect</span>
            <br />
            place with ease
          </h1>
          <div>
            <p className="text-xs sm:text-sm text-slate-400 flex flex-col gap-1">
              NihalEstate is the best place to find your next perfect place to
              live.
              <br />
              <span className="">
                We have a wide range of properties for you to choose from.
              </span>
            </p>
          </div>
          <div>
            <Link to="/search">
              <p className="text-blue-700 hover:underline cursor-pointer text-sm font-bold">
                Let&apos;s get started...
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow-lg">
        <Swiper navigation className="shadow-lg">
          {offerListings &&
            offerListings?.length > 0 &&
            offerListings?.map((listing) => (
              <SwiperSlide key={listing._id}>
                <img
                  src={listing?.imageUrls[0]}
                  alt={listing?.name}
                  className="h-[500px] w-full object-cover"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="mx-auto p-6 sm:p-10 sm:max-w-6xl flex flex-col gap-3">
        <h1 className="text-slate-600 text-2xl font-bold">Recent Offers</h1>
        <Link
          to="/search?offer=true"
          className="text-blue-700 hover:underline cursor-pointer font-bold text-sm"
        >
          Show more offers
        </Link>
        <div className="grid sm:grid-cols-4 gap-4">
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((offer) => (
              <FilteredListItem key={offer._id} filterData={offer} />
            ))}
        </div>
      </div>
      <div className="mx-auto p-6 sm:px-10 sm:max-w-6xl flex flex-col gap-3">
        <h1 className="text-slate-600 text-2xl font-bold">
          Recent Places For Rent
        </h1>
        <Link
          to="/search?type=rent"
          className="text-blue-700 hover:underline cursor-pointer font-bold text-sm"
        >
          Show more rent places
        </Link>
        <div className="grid sm:grid-cols-4 gap-4">
          {rentListings &&
            rentListings.length > 0 &&
            rentListings.map((rent) => (
              <FilteredListItem key={rent._id} filterData={rent} />
            ))}
        </div>
      </div>
      <div className="mx-auto p-6 sm:px-10 sm:max-w-6xl flex flex-col gap-3">
        <h1 className="text-slate-600 text-2xl font-bold">
          Recent Places For Sale
        </h1>
        <Link
          to="/search?type=sale"
          className="text-blue-700 hover:underline cursor-pointer font-bold text-sm"
        >
          Show more sale places
        </Link>
        <div className="grid sm:grid-cols-4 gap-4">
          {saleListings &&
            saleListings.length > 0 &&
            saleListings.map((sale) => (
              <FilteredListItem key={sale._id} filterData={sale} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
