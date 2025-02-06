import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

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
}

const ItemForm = () => {
  // Register form to validation and submission
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Iform>({
    defaultValues: {
      itemName: "",
      serialNumber: "",
      endDate: "",
      notes: "",
    },
  });

  //Create state http status error
  const [statusError, setStatusError] = useState<number | null>(null);

  // Fetch create item useing useCreateItem
  const { mutate: createItem } = useCreateItem(setStatusError);

  // Get id for edit mode
  const { id } = useParams<{ id: string }>();

  // Fetch item ,update, delete item using useCreateItem, useUpdateItem, useDeleteItem
  const { data: item, isLoading } = useGetItem(id || "", setStatusError);
  const { mutate: updateItem } = useUpdateItem(id || "", setStatusError);
  const { mutate: deleteItem } = useDeleteItem(id || "", setStatusError);

  // Update form id & formData
  useEffect(() => {
    if (id) {
      if (item) {
        setValue("itemName", item.itemName || "");
        setValue("serialNumber", item.serialNumber || "");
        setValue("endDate", item.endDate || "");
        setValue("notes", item.notes || "");
      }
    }
  }, [id, item, setValue]);

  // // Function on submit form
  const onSubmit: SubmitHandler<Iform> = (data) => {
    if (!id) {
      // Create mode
      createItem(data);
      return;
    }
    updateItem(data);
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
        <form className="py-5 flex flex-col gap-5 lg:px-40" onSubmit={handleSubmit(onSubmit)}>
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
            {/* itemName field */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">Item name</p>
              <input
                type="text"
                placeholder="type item name..."
                className="input input-bordered w-full max-w-xs h-10"
                {...register("itemName", {
                  required: "*** Item name is required ***",
                })}
              />
              {errors.itemName && <p className="w-fit mt-1 text-red-500 text-sm">{errors.itemName.message}</p>}
            </div>
            {/* Serial number field */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">Serial number</p>
              <input
                type="text"
                placeholder="type serial number..."
                className="input input-bordered w-full max-w-xs h-10"
                {...register("serialNumber", {
                  required: "*** Serial number is required ***",
                })}
              />
              {errors.serialNumber && <p className="w-fit mt-1 text-red-500 text-sm">{errors.serialNumber.message}</p>}
            </div>
            {/* Warranty end date field */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">Warranty end date</p>
              <input
                type="date"
                className="input input-bordered w-full max-w-xs h-10"
                {...register("endDate", {
                  required: "*** Warranty end date is required ***",
                })}
              />
              {errors.endDate && <p className="w-fit mt-1 text-red-500 text-sm">{errors.endDate.message}</p>}
            </div>
            {/* Notes field */}
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-gray-800">notes</p>
              <textarea placeholder="type notes..." className="textarea textarea-bordered" {...register("notes")} />
              {errors.notes && <p className="w-fit mt-1 text-red-500 text-sm">{errors.notes.message}</p>}
            </div>
          </div>
          <div className="mt-10 flex justify-end gap-3">
            <Link to="/items">
              <button className="btn p-2 w-24 bg-[#d9d9d9] rounded-lg">Back</button>
            </Link>
            {!id ? (
              <>
                <button type="submit" className="btn p-2 w-24 bg-green-500 rounded-lg text-white">
                  Create
                </button>
              </>
            ) : (
              <>
                <button onClick={handleDelete} className="btn p-2 w-24 bg-red-500 rounded-lg  text-white">
                  Delete
                </button>
                <button type="submit" className="btn p-2 w-24 bg-blue-500 rounded-lg text-white">
                  Edit
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
export default ItemForm;
