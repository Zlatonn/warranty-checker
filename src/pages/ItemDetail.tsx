import { Link } from "react-router-dom";

const ItemDetail = () => {
  return (
    <div className="py-5 flex flex-col gap-10 lg:px-40">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Edit item</h1>
        <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, pariatur?</p>
      </div>
      <div className="flex flex-col gap-8 text-gray-500">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">Item name : </p>
          <input type="text" placeholder="type item name..." className="border-[1px] outline-none rounded-lg px-2 py-1" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">Serial number : </p>
          <input type="text" placeholder="type serial number..." className="border-[1px] outline-none rounded-lg px-2 py-1" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">Warranty start date : </p>
          <input type="date" className="border-[1px] outline-none rounded-lg px-2 py-1" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">Warranty end date : </p>
          <input type="date" className="border-[1px] outline-none rounded-lg px-2 py-1" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">notes : </p>
          <textarea placeholder="type notes..." className="border-[1px] outline-none rounded-lg px-2 py-1" />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Link to="/">
          <button className="px-8 py-2 bg-[#d9d9d9] rounded-lg">Back</button>
        </Link>
        <button className="px-6 py-2 bg-red-500 rounded-lg  text-white">Delete</button>
        <button className="px-6 py-2 bg-blue-500 rounded-lg text-white">Update</button>
      </div>
    </div>
  );
};
export default ItemDetail;
