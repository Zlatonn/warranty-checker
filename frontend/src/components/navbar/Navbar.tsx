import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useSearchQuery from "../../stores/useSearchQuery";

import searchIcon from "../../assets/search_icon.png";
import userIcon from "../../assets/user-regular.svg";

const NavBar = () => {
  // useNavigate for manual channge route
  const navigate = useNavigate();

  // create local state
  const [searchInput, setSearchInput] = useState("");

  // import setSearchQuery funtion
  const { setSearchQuery } = useSearchQuery();

  // update seach query when click search buttom
  const handleSearch = () => {
    setSearchQuery(searchInput);
    navigate("/");
  };

  // when push enter at search input
  const handleKeyEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // function handle log out
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full bg-[#f5f7f9] border-b-[1px] border-gray-200">
      {/* Header */}
      <div className="flex flex-col p-5 gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* icon & application name*/}
        <Link to="/">
          <div className="flex items-center gap-3">
            <div className="w-10 sm:w-12 lg:w-14 ">
              <img
                src="https://dcdws.blob.core.windows.net/dws-2225908-7182-media/sites/7182/2023/02/warranty-icon-sign-free-png-1.png"
                className="object-cover rounded-full bg-yellow-400 p-1"
              />
            </div>
            <div className="flex flex-col text-gray-800 font-bold text-lg sm:text-xl lg:text-2xl">
              <p>warranty checker</p>
            </div>
          </div>
        </Link>
        {/* search box & create button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 flex-grow-2 flex items-center justify-between bg-white border-[1px] border-gray-200 rounded-xl overflow-hidden">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyEnter}
              placeholder="Enter search item..."
              className="flex-1 bg-transparent pl-3 border-none outline-none sm:pr-40 lg:pr-80"
            />
            <button className=" w-10 p-2 bg-[#d9d9d9]">
              <img src={searchIcon} onClick={handleSearch} className="object-cover" />
            </button>
          </div>
          <Link to="/create">
            <button className="h-10 px-4  inline-flex justify-center items-center bg-blue-500 text-white rounded-xl hover:rotate-180 hover:bg-blue-700 duration-500">
              +
            </button>
          </Link>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="w-10 h-10 p-3 flex justify-center items-center bg-white rounded-full border-[1px] cursor-pointer hover:bg-gray-100"
            >
              <img src={userIcon} alt="user-icon" className="object-cover" />
            </div>
            <ul tabIndex={0} className="dropdown-content menu mt-2 bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
              <li onClick={handleLogOut}>
                <a>Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
