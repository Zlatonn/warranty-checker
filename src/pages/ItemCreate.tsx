import axios from "axios";
import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { BASE_URL } from "./ItemList";

// define type form
interface Iform {
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
}

// define type form errors
interface IformErrors {
  itemName?: string;
  serialNumber?: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
}

const ItemCreate = () => {
  // create state from data
  const [formData, setFormData] = useState<Iform>({
    itemName: "",
    serialNumber: "",
    endDate: "",
    notes: "",
  });

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      // prevent form refesh page
      e.preventDefault();

      const invalid: IformErrors = validForm(formData);
      setErrors(invalid);

      // check erros object is empty
      if (Object.keys(invalid).length === 0) {
        await axios.post(`${BASE_URL}/create`, formData);
        alert("Item created successfully");
      }
    } catch (error) {
      console.error("Error post items:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-5 flex flex-col gap-5 lg:px-40">
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-gray-800">Create new item</h1>
        <p className="text-gray-500 text-sm lg:text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, pariatur?</p>
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
        <button type="submit" className="p-2 w-24 bg-green-500 rounded-lg text-white">
          Create
        </button>
      </div>
    </form>
  );
};
export default ItemCreate;
