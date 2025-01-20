import { useEffect, useState } from "react";
import Item from "../components/item/Item";
import axios from "axios";

// define items type
interface Items {
  id: number;
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays: number;
  isWarranty: boolean;
}

// define props type
interface Props {
  apiURL: string;
}

const ItemList = ({ apiURL }: Props) => {
  // state for items that get from api
  const [items, setItems] = useState<Items[]>([]);

  // function fetchItems with axios
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${apiURL}/items`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // intial get items
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // state for select display
  const [selectDisplay, setSelectDisplay] = useState("all");

  // state for currItems
  const [currItems, setCurrItems] = useState<Items[]>([]);

  //set current items with select display condition
  useEffect(() => {
    switch (selectDisplay) {
      case "all":
        setCurrItems(items);
        break;
      case "warranty":
        setCurrItems(items.filter((item) => item.isWarranty === true));
        break;
      case "expired":
        setCurrItems(items.filter((item) => item.isWarranty === false));
        break;
      default:
        break;
    }
  }, [selectDisplay, items]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end gap-3">
        <p className="text-gray-800">Show :</p>
        <select value={selectDisplay} onChange={(e) => setSelectDisplay(e.target.value)} className="text-gray-400 text-center outline-none">
          <option value="all">all</option>
          <option value="warranty">warranty</option>
          <option value="expired">expired</option>
        </select>
      </div>
      {currItems && currItems.length ? (
        <div className=" mt-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {currItems.map((item) => {
            return (
              <Item
                key={item.id}
                id={item.id}
                itemName={item.itemName}
                serialNumber={item.serialNumber}
                remainDays={item.remainDays}
                isWarranty={item.isWarranty}
              />
            );
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
