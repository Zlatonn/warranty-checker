import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL: string = "http://localhost:8000";

// define type form
interface Item {
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays?: number;
  isWarranty?: "warranty" | "nearExpire" | "expired";
}

// fetch get all items
export const useGetItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/items`);
      return data;
    },
  });
};

// fetch get single item
export const useGetItem = (id: number) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/item/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

// fetch create item
export const useCreateItem = () => {
  return useMutation({
    mutationFn: async ({ newItem }: { newItem: Item }) => {
      return await axios.post(`${BASE_URL}/create`, newItem);
    },
  });
};

// fetch update item
export const useUpdateItem = () => {
  return useMutation({
    mutationFn: async ({ id, newItem }: { id: number; newItem: Item }) => {
      return await axios.put(`${BASE_URL}/item/${id}`, newItem);
    },
  });
};

// fetch delete item
export const useDeleteItem = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.delete(`${BASE_URL}/item/${id}`);
    },
  });
};
