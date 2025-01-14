import searchIcon from "../../assets/search_icon.png";

const NavBar = () => {
  return (
    <div className="w-full bg-[#f5f7f9] flex flex-col">
      {/* Header */}
      <div className="flex flex-col p-5 gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* icon & application name*/}
        <div className="flex items-center gap-3">
          <div className="w-10 sm:w-12 lg:w-14 ">
            <img
              src="https://i.pinimg.com/736x/c0/98/11/c09811f91b1b1dae29e16cc782aaf48a.jpg "
              className="object-cover rounded-lg border-[1px] border-gray-300"
            />
          </div>
          <div className="flex flex-col text-gray-800 font-bold text-lg sm:text-xl lg:text-2xl">
            <p>warranty</p>
            <p>checker</p>
          </div>
        </div>
        {/* search box & create button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 flex-grow-2 flex items-center justify-between bg-white border-[1px] border-gray-200 rounded-xl overflow-hidden">
            <input
              type="text"
              placeholder="Enter search item..."
              className="flex-1 bg-transparent pl-3 border-none outline-none sm:pr-40 lg:pr-80"
            />
            <button className=" w-10 p-2 bg-[#d9d9d9]">
              <img src={searchIcon} className="object-cover" />
            </button>
          </div>
          <button className="h-10 px-4  inline-flex justify-center items-center bg-blue-500 duration-300 hover:bg-blue-300 text-white rounded-xl">
            +
          </button>
        </div>
      </div>

      {/* Sub-header */}
      <div className="w-full bg-[#d9d9d9]">
        <div className="flex items-center py-1 px-5 gap-5 text-gray-800 sm:gap-10 lg:gap-15">
          <p className="px-2 py-1 rounded-md duration-300 hover:bg-gray-100 cursor-pointer">all</p>
          <p className="px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer">warranty</p>
          <p className="px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer">expired</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
