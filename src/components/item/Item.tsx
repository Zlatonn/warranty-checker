const Item = () => {
  return (
    <div className="flex justify-between p-3 border-[1px] bg-[#f5f7f9] rounded-xl cursor-pointer hover:shadow-lg duration-300">
      {/* Left content */}
      <div className="flex flex-col justify-between gap-2 sm:gap-3">
        <p className="text-sm text-gray-700">serial: XXXXXXXXXX</p>
        <h1 className="text-xl text-blue-500 font-semibold">Item name</h1>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-green-500"></div>
          <p className="text-lg text-green-500">warranty</p>
        </div>
      </div>
      {/* right content */}
      <div className="flex flex-col justify-between items-end gap-3">
        <p className="text-sm text-gray-700">
          remainding : <span>5 days</span>
        </p>
      </div>
    </div>
  );
};
export default Item;
