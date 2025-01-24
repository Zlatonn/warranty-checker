import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

// define type form
interface Item {
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays?: number;
  isWarranty?: "warranty" | "nearExpire" | "expired";
}

// create axios instance for set default config
const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// fetch get all items
export const useGetItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await axiosClient.get(`/items`);
      return response.data;
    },
  });
};

// fetch get single item
export const useGetItem = (id: number) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const response = await axiosClient.get(`/item/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// fetch create item
export const useCreateItem = () => {
  return useMutation({
    mutationFn: async ({ newItem }: { newItem: Item }) => {
      return await axiosClient.post(`/create`, newItem);
    },
  });
};

// fetch update item
export const useUpdateItem = () => {
  return useMutation({
    mutationFn: async ({ id, newItem }: { id: number; newItem: Item }) => {
      return await axiosClient.put(`/item/${id}`, newItem);
    },
  });
};

// fetch delete item
export const useDeleteItem = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await axiosClient.delete(`/item/${id}`);
    },
  });
};
