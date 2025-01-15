import { useEffect, useState } from "react";
import Item from "../components/item/Item";
import axios from "axios";

const BASE_URL: string = "http://localhost:8000";

interface Iitems {
  id: number;
  itemName: string;
  serialNumber: string;
  startDate: string;
  endDate: string;
  notes: string;
}
const ItemList = () => {
  const [items, setItems] = useState<Iitems[]>([]);

  // function fetchItem with axios
  const fetchItem = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/items`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // intial get item
  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end gap-3">
        <p className="text-gray-800">Show :</p>
        <select className="text-gray-400 text-center outline-none">
          <option value="all">all</option>
          <option value="warranty">warranty</option>
          <option value="expired">expired</option>
        </select>
      </div>
      {items && items.length ? (
        <div className=" mt-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {items.map((item) => {
            return <Item key={item.id} id={item.id} itemName={item.itemName} serialNumber={item.serialNumber} />;
          })}
        </div>
      ) : (
        <div className="mt-10">
          <p className="text-2xl text-gray-">No items</p>
        </div>
      )}
    </div>
  );
};
export default ItemList;
