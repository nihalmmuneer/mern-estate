import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchUrlParams = urlParams.get("searchTerm");
    if (searchUrlParams) {
      setSearchTerm(searchUrlParams);
    } else {
      setSearchTerm("");
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center p-3 max-w-6xl mx-auto text-sm sm:text-lg">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-slate-500">Nihal</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          className="bg-slate-100 flex items-center p-3 rounded-lg"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search.."
            className=" text-slate-700 bg-transparent w-24 sm:w-64 focus:outline-none "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-slate-600 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-600 hover:underline cursor-pointer">
              About
            </li>
          </Link>

          {currentUser ? (
            <Link to="/profile">
              <img
                className="h-8  w-8 rounded-full object-cover"
                src={currentUser?.photo}
                alt={currentUser?.username}
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className="text-slate-600 hover:underline cursor-pointer">
                Sign in
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
