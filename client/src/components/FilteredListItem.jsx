import PropTypes from "prop-types";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
const FilteredListItem = ({ filterData }) => {
  console.log(filterData, "filterData-Prop");
  return (
    <div className="p-3">
      <div className=" w-[300px]  bg-white shadow-md hover:shadow-lg overflow-hidden flex flex-col gap-2">
        <Link to={`/listing/${filterData?._id}`}>
          <img  
            src={filterData?.imageUrls[0]}
            alt={filterData?.name}
            className="w-full hover:scale-105 h-[200px] transition-scale transition-transform"
          />
        </Link>
        <div className="p-2 flex flex-col gap-2">
          <div className="truncate text-slate-800 font-bold">
            {filterData?.name}
          </div>
          <div className="flex items-center gap-1">
            <MdLocationPin className="text-green-500" />
            <p className="text-slate-700 text-sm truncate">{filterData?.address}</p>
          </div>
          <div className="text-slate-700 line-clamp-2 text-sm">
            {filterData?.description}
          </div>
          <div className="text-slate-500 font-semibold">
            {filterData?.offer
              ? `$${filterData?.discountPrice?.toLocaleString("en-US")}`
              : `$${filterData?.regularPrice?.toLocaleString("en-US")}`}
            {filterData?.type === "rent" ? "/month" : ""}
          </div>
          <div className="flex items-center gap-3 text-slate-700 font-medium text-sm">
            <div>
              {filterData?.bedrooms?.length > 1
                ? `${filterData?.bedrooms} beds`
                : `${filterData?.bedrooms} bed`}
            </div>
            <div>
              {filterData?.bathrooms?.length > 1
                ? `${filterData?.bathrooms} baths`
                : `${filterData?.bathrooms} bath`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredListItem;

FilteredListItem.propTypes = {
  filterData: PropTypes.object.isRequired,
};
