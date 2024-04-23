import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaLocationDot } from "react-icons/fa6";
import {
  FaBath,
  FaBed,
  FaChair,
  FaParking,
  FaPhone,
  FaShare,
} from "react-icons/fa";
import { ContactLandLord } from "../components/ContactLandLord";
// Install Swiper modules

const Listing = () => {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const [listings, setListings] = useState();
  const [contact, showContact] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/listing/get/listings/${params.listingId}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      if (res.ok) {
        setListings(data);
      }
    };
    fetchData();
  }, []);
  console.log(listings);
  return (
    <div>
      <Swiper navigation>
        {listings &&
          listings?.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              {/* <div
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="h-[400px]"
            ></div> */}
              <img
                src={url}
                alt="image"
                className="object-fill bg-no-repeat w-full h-[350px]"
              />
            </SwiperSlide>
          ))}
        {/* Add more slides as needed */}
      </Swiper>
      <div className="cursor-pointer bg-slate-100 z-10 rounded-full w-12 h-12 border flex justify-center items-center   fixed top-[13%] right-[3%] ">
        <FaShare
          className="text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        />
      </div>
      {copied && (
        <p className="bg-slate-100  fixed top-[23%] z-10 right-[5%] p-2 rounded-md">
          Link Copied !
        </p>
      )}
      <div className="max-w-2xl mx-auto my-5 p-3">
        <h1 className="text-lg font-semibold">
          {listings?.name} - <span>$ {listings?.regularPrice}</span>
          {""} <span>{listings?.type === "rent" ? "/month" : ""}</span>
        </h1>
        <div className="mt-5 font-sans">
          <p className="text-green-700 gap-2 items-center flex">
            <FaLocationDot />
            {""}
            <span className="text-slate-600 font-semibold">
              {listings?.address}
            </span>
          </p>
        </div>
        <div className="flex font-sans items-center mt-5 gap-3 ">
          <p className="p-2 px-6 w-36 rounded-lg text-white bg-red-600 text-center whitespace-nowrap">
            {listings?.type === "rent" ? "For Rent" : "For Sale"}
          </p>
          <p className="p-2 px-6 w-40 rounded-lg text-white bg-green-700 text-center whitespace-nowrap">
            {listings?.offer
              ? `$` +
                (listings.regularPrice - listings.discountPrice) +
                ` discount`
              : "No Discount"}{" "}
          </p>
        </div>
        <div className="text-slate-700 flex flex-col gap-6">
          <p className="mt-8 text-justify">
            <span className="font-semibold">Description-</span>
            {listings?.description}
          </p>
        </div>
        <div className="mt-5 flex gap-8 items-center">
          <div className="flex items-center text-green-800 gap-2">
            <FaBed />
            <span className="">
              {listings?.bedrooms} {listings?.bedrooms > 1 ? "Beds" : "Bed"}
            </span>
          </div>
          <div className="flex items-center text-green-800 gap-2">
            <FaBath />
            <span>
              {listings?.bathrooms} {listings?.bathrooms > 1 ? "Baths" : "Bath"}
            </span>
          </div>
          <div className="flex items-center text-green-800 gap-2">
            <FaParking />
            <span>{listings?.parking ? "Parking" : "No parking"}</span>
          </div>
          <div className="flex items-center text-green-800 gap-2">
            <FaChair />
            <span>{listings?.furnished ? "Furnished" : "Not Furnished"}</span>
          </div>
        </div>
        {currentUser._id !== listings?.userRef && !contact && (
          <button
            className=" hover:opacity-90 text-white flex justify-center items-center gap-2 uppercase bg-slate-700 p-3 w-full rounded-lg mt-5 font-sans font-semibold"
            type="button"
            onClick={() => showContact(true)}
          >
            Contact LandLord <FaPhone />
          </button>
        )}
        {contact && <ContactLandLord listings={listings} />}
      </div>
    </div>
  );
};

export default Listing;
