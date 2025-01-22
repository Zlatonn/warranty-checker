import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Item from "../components/item/Item";

// define items type
interface Items {
  id: number;
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays: number;
  isWarranty: "warranty" | "nearExpire" | "expired";
}

// define props type
interface Props {
  apiURL: string;
  searchQuery: string;
}

const ItemList = ({ apiURL, searchQuery }: Props) => {
  // function fetchItems with axios
  const fetchItems = async () => {
    const response = await axios.get(`${apiURL}/items`);
    return response.data;
  };

  // useQuery for manage fetching items
  const {
    data: items,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // state for select display
  const [selectDisplay, setSelectDisplay] = useState("all");

  // state for currItems
  const [currItems, setCurrItems] = useState<Items[]>([]);

  // update current items
  useEffect(() => {
    let filterdItems = items;

    // filter with display filter condition
    switch (selectDisplay) {
      case "all":
        break;
      case "warranty":
        filterdItems = items.filter((item: Items) => item.isWarranty === "warranty");
        break;
      case "nearExpire":
        filterdItems = items.filter((item: Items) => item.isWarranty === "nearExpire");
        break;
      case "expired":
        filterdItems = items.filter((item: Items) => item.isWarranty === "expired");
        break;
      default:
        break;
    }

    // if have text at search box => second filter with search box
    if (searchQuery) {
      filterdItems = filterdItems.filter(
        (item: Items) =>
          item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setCurrItems(filterdItems);
  }, [items, selectDisplay, searchQuery]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end gap-3">
        <p className="text-gray-800">Show :</p>
        <select value={selectDisplay} onChange={(e) => setSelectDisplay(e.target.value)} className="text-gray-400 text-center outline-none">
          <option value="all">all</option>
          <option value="warranty">warranty</option>
          <option value="nearExpire">near expire</option>
          <option value="expired">expired</option>
        </select>
      </div>
      {/* data from fetching section */}
      {isLoading ? (
        <div className="mt-10">
          <p className="text-2xl text-gray-800">Loading...</p>
        </div>
      ) : isError ? (
        <div className="mt-10">
          <p className="text-2xl text-red-500">{error.message}</p>
        </div>
      ) : currItems && currItems.length ? (
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
          <p className="text-2xl text-gray-800">No items</p>
        </div>
      )}
    </div>
  );
};
export default ItemList;
