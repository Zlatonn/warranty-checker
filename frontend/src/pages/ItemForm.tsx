import { useState, ChangeEvent, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetItem, useCreateItem, useUpdateItem, useDeleteItem } from "../hooks/useApi";
import { AxiosError } from "axios";

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
  // useNavigate for manual change route
  const navigate = useNavigate();

  // Create state formData
  const [formData, setFormData] = useState<Iform>({
    itemName: "",
    serialNumber: "",
    endDate: "",
    notes: "",
  });

  // Create state errors
  const [errors, setErrors] = useState<IformErrors>({});

  // Fetch create item useing useCreateItem
  const { mutateAsync: createItem } = useCreateItem();

  // Create state id
  const [itemId, setItemId] = useState("");

  // Get id for edit mode
  const { id } = useParams<{ id: string }>();

  // Fetch item ,update, delete item using useCreateItem, useUpdateItem, useDeleteItem
  const { data: item, isLoading, isError, error } = useGetItem(itemId);
  const { mutateAsync: updateItem } = useUpdateItem(itemId);
  const { mutateAsync: deleteItem } = useDeleteItem(itemId);

  // Update form itemId & formData
  useEffect(() => {
    if (id) {
      setItemId(id);
      setFormData(item);
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
  const handleSubmit = async () => {
    const invalid: IformErrors = validForm(formData);
    setErrors(invalid);

    // Check erros object is empty
    if (Object.keys(invalid).length === 0) {
      // Check mode
      if (!itemId) {
        // Create mode
        try {
          await createItem(formData);
          alert("The item has been successfully created. ✅");
          navigate("/");
        } catch (error) {
          console.error("Error post item:", error);
          alert("Failed to create the item. Please try again later. ❌");
        }
        return;
      }
      // Edit mode
      try {
        await updateItem(formData);
        alert("The item has been successfully updated. ✅");
        navigate("/");
      } catch (error) {
        console.error("Error put item:", error);
        alert("Failed to update the item. Please try again later. ❌");
      }
    }
  };

  // Function handle form delete
  const handleDelete = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) {
      return;
    }
    try {
      await deleteItem();
      alert("The item has been successfully deleted. ✅");
      navigate("/");
    } catch (error) {
      console.error("Error delete item:", error);
      alert("Failed to delete the item. Please try again later. ❌");
    }
  };

  // Return JSX with loading condition
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-10 sm:px-15 lg:px-20">
        <div className="py-5 flex flex-col gap-5 lg:px-40">
          <div className="skeleton h-8 w-1/4"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <hr />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="skeleton h-4 w-1/6"></div>
              <div className="skeleton h-6 w-1/4"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="skeleton h-4 w-1/6"></div>
              <div className="skeleton h-6 w-1/4"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="skeleton h-4 w-1/6"></div>
              <div className="skeleton h-6 w-1/4"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="skeleton h-4 w-1/6"></div>
              <div className="skeleton h-20 w-full"></div>
            </div>
          </div>
          <div className="mt-10 flex justify-end gap-3">
            <div className="skeleton h-8 w-20"></div>
            <div className="skeleton h-8 w-20"></div>
            <div className="skeleton h-8 w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  // Return JSX with error condition
  if (isError) {
    const axiosError = error as AxiosError; //Change error to AxiosError Type
    return (
      <div className="mt-10 flex flex-col items-center gap-5">
        {axiosError.request ? (
          <p className="text-5xl text-gray-500">500</p>
        ) : (
          <p className="text-5xl text-gray-500">{axiosError.response?.status}</p>
        )}
        <p className="text-xl text-gray-400">{axiosError.message}</p>
      </div>
    );
  }

  // Return JSX with normal condition
  return (
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
            {errors.itemName && <p className="w-fit mt-1 text-red-500 text-sm">{errors.itemName}</p>}
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
            {errors.serialNumber && <p className="w-fit mt-1 text-red-500 text-sm">{errors.serialNumber}</p>}
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
            {errors.endDate && <p className="w-fit mt-1 text-red-500 text-sm">{errors.endDate}</p>}
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
            {errors.notes && <p className="w-fit mt-1 text-red-500 text-sm">{errors.notes}</p>}
          </div>
        </div>
        <div className="mt-10 flex justify-end gap-3">
          <Link to="/">
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
  );
};
export default ItemForm;
