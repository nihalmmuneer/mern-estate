import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser, "currentUser");
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center p-3 max-w-6xl mx-auto text-sm sm:text-lg">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-slate-500">Nihal</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 flex items-center p-3 rounded-lg">
          <input
            type="text"
            placeholder="Search.."
            className=" text-slate-700 bg-transparent w-24 sm:w-64 focus:outline-none"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4 items-center" >
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
          <Link to="/sign-in">
            {currentUser ? (
              <img className="h-8  w-8 rounded-full object-cover" src={currentUser?.photo} alt={currentUser?.username} />
            ) : (
              <li className="text-slate-600 hover:underline cursor-pointer">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
