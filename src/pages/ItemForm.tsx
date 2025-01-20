import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// define type form
interface Iform {
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays?: number;
  isWarranty?: "warranty" | "nearExpire" | "expired";
}

// define type form errors
interface IformErrors {
  itemName?: string;
  serialNumber?: string;
  endDate?: string;
  notes?: string;
}

// define props type
interface Props {
  apiURL: string;
}

const ItemForm = ({ apiURL }: Props) => {
  // get id for edit mode
  const { id } = useParams<{ id: string }>();

  // useNavigate for manual channge route
  const navigate = useNavigate();

  // parse to int
  const itemId = id ? parseInt(id) : null;

  // create state from data
  const [formData, setFormData] = useState<Iform>({
    itemName: "",
    serialNumber: "",
    endDate: "",
    notes: "",
  });

  // function fetchItem with axios
  const fetchItem = async () => {
    try {
      const response = await axios.get(`${apiURL}/item/${itemId}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // intial get item when have id
  useEffect(() => {
    if (itemId) {
      fetchItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  // function handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // function valid form
  const validForm = (body: Iform) => {
    const validErrors: IformErrors = {};
    if (!body.itemName) validErrors.itemName = "*** Item name is required ***";
    if (!body.serialNumber) validErrors.serialNumber = "*** Serial number is required ***";
    if (!body.endDate) validErrors.endDate = "*** Warranty end date is required ***";
    if (!body.notes) validErrors.notes = "*** Notes is required ***";
    return validErrors;
  };

  // create state errors
  const [errors, setErrors] = useState<IformErrors>({});

  // function handle form submit
  const handleSubmit = async () => {
    try {
      const invalid: IformErrors = validForm(formData);
      setErrors(invalid);

      // check erros object is empty
      if (Object.keys(invalid).length === 0) {
        // create mode
        if (!id) {
          await axios.post(`${apiURL}/create`, formData);
          alert("Item created successfully");
          navigate("/");
          return;
        }
        // edit mode
        await axios.put(`${apiURL}/item/${itemId}`, formData);
        alert("Item updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error post items:", error);
    }
  };

  // function handle form delete
  const handleDelete = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`${apiURL}/item/${itemId}`);
      alert("Item delete successfully");
      navigate("/");
    } catch (error) {
      console.error("Error post items:", error);
    }
  };

  return (
    <div className="py-5 flex flex-col gap-5 lg:px-40">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-gray-800">{!id ? "Create new item" : "Edit item"}</h1>
        <p className="text-gray-500 text-sm lg:text-md">
          {!id
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
            value={formData.itemName}
            onChange={handleInputChange}
            className="w-full px-2 py-1 rounded-lg border-[1px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.itemName && <p className="w-fit mt-1 text-red-500 text-sm">{errors.itemName}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">Serial number</p>
          <input
            type="text"
            placeholder="type serial number..."
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleInputChange}
            className="w-full px-2 py-1 rounded-lg border-[1px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.serialNumber && <p className="w-fit mt-1 text-red-500 text-sm">{errors.serialNumber}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">Warranty end date</p>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="w-full px-2 py-1 rounded-lg border-[1px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.endDate && <p className="w-fit mt-1 text-red-500 text-sm">{errors.endDate}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-gray-800">notes</p>
          <textarea
            placeholder="type notes..."
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full px-2 py-1 rounded-lg border-[1px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.notes && <p className="w-fit mt-1 text-red-500 text-sm">{errors.notes}</p>}
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Link to="/">
          <button className="p-2 w-24 bg-[#d9d9d9] rounded-lg">Back</button>
        </Link>
        {!id ? (
          <>
            <button onClick={handleSubmit} className="p-2 w-24 bg-green-500 rounded-lg text-white">
              Create
            </button>
          </>
        ) : (
          <>
            <button onClick={handleDelete} className="p-2 w-24 bg-red-500 rounded-lg  text-white">
              Delete
            </button>
            <button onClick={handleSubmit} className="p-2 w-24 bg-blue-500 rounded-lg text-white">
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default ItemForm;
