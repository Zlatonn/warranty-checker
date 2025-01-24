import { useEffect, useState } from "react";
import { useGetItems } from "../hooks/useApi";

import Item from "../components/item/Item";

// Define items type
interface Items {
  id: number;
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays: number;
  isWarranty: "warranty" | "nearExpire" | "expired";
}

// Define props type
interface Props {
  searchQuery: string;
}

const ItemList = ({ searchQuery }: Props) => {
  // Fetch items using useGetItems()
  const { data: items, isLoading, isError, error } = useGetItems();

  // Create state for select display
  const [selectDisplay, setSelectDisplay] = useState("all");

  // Create state for currItems
  const [currItems, setCurrItems] = useState<Items[]>([]);

  // Update current items to display
  useEffect(() => {
    let filterdItems = items;

    // Filter with display filter condition
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

    // If have text at search box => second filter with search box
    if (searchQuery) {
      filterdItems = filterdItems.filter(
        (item: Items) =>
          item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setCurrItems(filterdItems);
  }, [items, selectDisplay, searchQuery]);

  // Return JSX with loading condition
  if (isLoading) {
    return (
      <div className="mt-10">
        <p className="text-2xl text-gray-800">Loading...</p>
      </div>
    );
  }

  // Return JSX with error condition
  if (isError) {
    return (
      <div className="mt-10">
        <p className="text-2xl text-red-500">{error.message}</p>
      </div>
    );
  }

  //Return JSX with normal condition
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
          <p className="text-2xl text-gray-800">No items</p>
        </div>
      )}
    </div>
  );
};
export default ItemList;
