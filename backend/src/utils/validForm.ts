import { Items } from "../types/itemsType";

const validForm = (body: Items): string[] => {
  // Declare erros
  const errors = [];

  // Check blank error 1 by 1
  if (!body.itemName) errors.push("itemName is required");
  if (!body.serialNumber) errors.push("serialNumber is required");
  if (!body.endDate) errors.push("endDate is required");

  // Return errors
  return errors;
};

export default validForm;
