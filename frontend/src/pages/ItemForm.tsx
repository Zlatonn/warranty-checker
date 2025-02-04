import { useState, ChangeEvent, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useGetItem, useCreateItem, useUpdateItem, useDeleteItem } from "../hooks/useApi";

import NavBar from "../components/navbar/Navbar";
import LoadItemForm from "../components/loading/LoadItemForm";
import ErrorNetwork from "../components/error/ErrorNetwork";
import Error400 from "../components/error/Error400";
import Error401 from "../components/error/Error401";
import Error404 from "../components/error/Error404";
import Error422 from "../components/error/Error422";
import Error500 from "../components/error/Error500";
import ErrorUnexpected from "../components/error/ErrorUnexpected";

// Define type form
interface Iform {
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays?: number;
  isWarranty?: "warranty" | "nearExpire" | "expired";
}

// Define type form errors
interface IformErrors {
  itemName?: string;
  serialNumber?: string;
  endDate?: string;
  notes?: string;
}

const ItemForm = () => {
  // Create state formData
  const [formData, setFormData] = useState<Iform>({
    itemName: "",
    serialNumber: "",
    endDate: "",
    notes: "",
  });

  // Create state errors
  const [formErrors, setFormErrors] = useState<IformErrors>({});

  //Create state http status error
  const [statusError, setStatusError] = useState<number | null>(null);

  // Fetch create item useing useCreateItem
  const { mutate: createItem } = useCreateItem(setStatusError);

  // Create state id
  const [itemId, setItemId] = useState("");

  // Get id for edit mode
  const { id } = useParams<{ id: string }>();

  // Fetch item ,update, delete item using useCreateItem, useUpdateItem, useDeleteItem
  const { data: item, isLoading } = useGetItem(itemId, setStatusError);
  const { mutate: updateItem } = useUpdateItem(itemId, setStatusError);
  const { mutate: deleteItem } = useDeleteItem(itemId, setStatusError);

  // Update form itemId & formData
  useEffect(() => {
    if (id) {
      setItemId(id);
      if (item) {
        setFormData({
          itemName: item.itemName || "",
          serialNumber: item.serialNumber || "",
          endDate: item.endDate || "",
          notes: item.notes || "",
        });
      }
    }
  }, [id, item]);

  // Function handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Function valid form
  const validForm = (body: Iform) => {
    const validErrors: IformErrors = {};
    if (!body.itemName) validErrors.itemName = "*** Item name is required ***";
    if (!body.serialNumber) validErrors.serialNumber = "*** Serial number is required ***";
    if (!body.endDate) validErrors.endDate = "*** Warranty end date is required ***";
    if (!body.notes) validErrors.notes = "*** Notes is required ***";
    return validErrors;
  };

  // Function handle form submit
  const handleSubmit = () => {
    const invalid: IformErrors = validForm(formData);
    setFormErrors(invalid);

    // Check erros object is empty
    if (Object.keys(invalid).length === 0) {
      // Check mode
      if (!itemId) {
        // Create mode
        createItem(formData);
        return;
      }
      // Edit mode
      updateItem(formData);
    }
  };

  // Function handle form delete
  const handleDelete = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) {
      return;
    }
    deleteItem();
  };

  // Return JSX with loading condition
  if (isLoading) {
    return (
      <>
        <NavBar />
        <LoadItemForm />
      </>
    );
  }

  // Return JSX with error condition
  if (statusError !== null) {
    switch (statusError) {
      case 0:
        return <ErrorNetwork />;
      case 400:
        return <Error400 />;
      case 401:
        return <Error401 />;
      case 404:
        return <Error404 />;
      case 422:
        return <Error422 />;
      case 500:
        return <Error500 />;
      default:
        return <ErrorUnexpected />;
    }
  }

  // Return JSX with normal condition
  return (
    <>
      <NavBar />
      <div className="container mx-auto py-10 px-10 sm:px-15 lg:px-20">
        <div className="py-5 flex flex-col gap-5 lg:px-40">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold text-gray-800">{!itemId ? "Create new item" : "Edit item"}</h1>
            <p className="text-gray-500 text-sm lg:text-md">
              {!itemId
                ? "This feature allows users to add a new item to the system. You can input the item's details such as name, serial number, warranty end date, and any additional notes. Once submitted, the item will be saved and displayed in the item list for tracking."
                : "This feature enables users to update the details of an existing item. You can modify the item's name, serial number, warranty information, or notes. This ensures that item details remain accurate and up to date in the system."}
            </p>

            <hr />
          </div>
          <div className="flex flex-col gap-8 text-gray-500">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">Item name</p>
              <input
                type="text"
                placeholder="type item name..."
                name="itemName"
                value={formData?.itemName}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-xs h-10"
              />
              {formErrors.itemName && <p className="w-fit mt-1 text-red-500 text-sm">{formErrors.itemName}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">Serial number</p>
              <input
                type="text"
                placeholder="type serial number..."
                name="serialNumber"
                value={formData?.serialNumber}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-xs h-10"
              />
              {formErrors.serialNumber && <p className="w-fit mt-1 text-red-500 text-sm">{formErrors.serialNumber}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">Warranty end date</p>
              <input
                type="date"
                name="endDate"
                value={formData?.endDate}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-xs h-10"
              />
              {formErrors.endDate && <p className="w-fit mt-1 text-red-500 text-sm">{formErrors.endDate}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">notes</p>
              <textarea
                placeholder="type notes..."
                name="notes"
                value={formData?.notes}
                onChange={handleInputChange}
                className="textarea textarea-bordered"
              />
              {formErrors.notes && <p className="w-fit mt-1 text-red-500 text-sm">{formErrors.notes}</p>}
            </div>
          </div>
          <div className="mt-10 flex justify-end gap-3">
            <Link to="/items">
              <button className="btn p-2 w-24 bg-[#d9d9d9] rounded-lg">Back</button>
            </Link>
            {!itemId ? (
              <>
                <button onClick={handleSubmit} className="btn p-2 w-24 bg-green-500 rounded-lg text-white">
                  Create
                </button>
              </>
            ) : (
              <>
                <button onClick={handleDelete} className="btn p-2 w-24 bg-red-500 rounded-lg  text-white">
                  Delete
                </button>
                <button onClick={handleSubmit} className="btn p-2 w-24 bg-blue-500 rounded-lg text-white">
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ItemForm;
