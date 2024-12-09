import PropTypes from "prop-types";
import { MdLocationPin } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FilteredListItem = ({ filterData = {} }) => {
  const { currentUser } = useSelector((state) => state.user);

  const bedrooms = Array.isArray(filterData?.bedrooms) ? filterData.bedrooms.length : 0;
  const bathrooms = Array.isArray(filterData?.bathrooms) ? filterData.bathrooms.length : 0;

  return (
    <div className="flex">
      {!filterData ? (
        <div className="flex justify-center items-center w-full h-64">
          <img src="/rolling.gif" alt="Loading..." className="h-16 w-16" />
        </div>
      ) : (
        <div className="rounded-lg my-4 w-full sm:w-[300px] bg-white shadow-md hover:shadow-lg overflow-hidden flex flex-col gap-2">
          <Link to={currentUser ? `/listing/${filterData?._id}` : `/sign-in`}>
            <img
              src={filterData?.imageUrls?.[0] || "/placeholder-image.png"}
              alt={filterData?.name || "Property"}
              className="w-full hover:scale-105 h-[200px] transition-scale transition-transform"
            />
          </Link>
          <div className="p-2 flex flex-col gap-2">
            <div className="truncate text-slate-800 font-bold">
              {filterData?.name || "Unknown Property"}
            </div>
            <div className="flex items-center gap-1">
              <MdLocationPin className="text-green-500" />
              <p className="text-slate-700 text-sm truncate">
                {filterData?.address || "No Address Available"}
              </p>
            </div>
            <div className="text-slate-700 line-clamp-2 text-sm">
              {filterData?.description || "No Description Available"}
            </div>
            <div className="text-slate-500 font-semibold">
              {filterData?.offer
                ? `$${filterData?.discountPrice?.toLocaleString("en-US")}`
                : `$${filterData?.regularPrice?.toLocaleString("en-US")}`}
              {filterData?.type === "rent" ? "/month" : ""}
            </div>
            <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
              <div>
                {bedrooms > 1 ? `${bedrooms} beds` : `${bedrooms} bed`}
              </div>
              <div>
                {bathrooms > 1 ? `${bathrooms} baths` : `${bathrooms} bath`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

FilteredListItem.propTypes = {
  filterData: PropTypes.object.isRequired,
};

export default FilteredListItem;
