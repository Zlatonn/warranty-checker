import { useEffect, useState } from "react";
import { useGetItems } from "../hooks/useApi";

import useSearchQuery from "../stores/useSearchQuery";

import Item from "../components/item/Item";
import NavBar from "../components/navbar/Navbar";
import LoadItemList from "../components/loading/LoadItemList";
import ErrorNetwork from "../components/error/ErrorNetwork";
import Error401 from "../components/error/Error401";
import Error500 from "../components/error/Error500";
import ErrorUnexpected from "../components/error/ErrorUnexpected";
import Error404 from "../components/error/Error404";

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

const ItemList = () => {
  //Create state http status error
  const [statusError, setStatusError] = useState<number | null>(null);

  // Fetch items using useGetItems()
  const { data: items, isLoading } = useGetItems(setStatusError);

  // Create state for select display
  const [selectDisplay, setSelectDisplay] = useState("all");

  // import searchQuery state
  const { searchQuery } = useSearchQuery();

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
      <>
        <NavBar />
        <LoadItemList />
      </>
    );
  }

  // Return JSX with error condition
  if (statusError !== null) {
    switch (statusError) {
      case 0:
        return <ErrorNetwork />;
      case 401:
        return <Error401 />;
      case 404:
        return <Error404 />;
      case 500:
        return <Error500 />;
      default:
        return <ErrorUnexpected />;
    }
  }

  //Return JSX with normal condition
  return (
    <>
      <NavBar />
      <div className="container mx-auto py-10 px-10 sm:px-15 lg:px-20">
        <div className="flex flex-col">
          <div className="flex justify-end gap-3">
            <p className="text-gray-800">Show :</p>
            <select
              value={selectDisplay}
              onChange={(e) => setSelectDisplay(e.target.value)}
              className="text-gray-400 text-center outline-none"
            >
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
      </div>
    </>
  );
};
export default ItemList;
