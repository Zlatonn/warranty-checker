import Item from "../components/item/Item";

const ItemList = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-end gap-3">
        <p className="text-gray-800">Show :</p>
        <select className="text-gray-400 text-center">
          <option value="all">all</option>
          <option value="warranty">warranty</option>
          <option value="expired">expired</option>
        </select>
      </div>
      <div className=" mt-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};
export default ItemList;
