import { Link } from "react-router-dom";

const ItemCreate = () => {
  return (
    <div className="py-5 flex flex-col gap-5 lg:px-40">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-gray-800">Create new item</h1>
        <p className="text-gray-500 text-sm lg:text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, pariatur?</p>
        <hr />
      </div>
      <div className="flex flex-col gap-8 text-gray-500">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">Item name</p>
          <input
            type="text"
            placeholder="type item name..."
            className="w-full px-2 py-1 rounded-lg border-[1px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">Serial number</p>
          <input
            type="text"
            placeholder="type serial number..."
            className="w-full px-2 py-1 rounded-lg border-[1px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">Warranty start date</p>
          <input
            type="date"
            className="w-full px-2 py-1 rounded-lg border-[1px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">Warranty end date</p>
          <input
            type="date"
            className="w-full px-2 py-1 rounded-lg border-[1px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">notes</p>
          <textarea
            placeholder="type notes..."
            className="w-full px-2 py-1 rounded-lg border-[1px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Link to="/">
          <button className="p-2 w-24 bg-[#d9d9d9] rounded-lg">Back</button>
        </Link>
        <button className="p-2 w-24 bg-green-500 rounded-lg text-white">Create</button>
      </div>
    </div>
  );
};
export default ItemCreate;
