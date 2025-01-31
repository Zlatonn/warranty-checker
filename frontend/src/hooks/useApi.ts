import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Item api
 */

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

// fucntion get authorization header
const getAuthorHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// fetch get all items
export const useGetItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await axiosClient.get(`/items`, getAuthorHeader());
      return response.data;
    },
  });
};

// fetch get single item
export const useGetItem = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const response = await axiosClient.get(`/item/${id}`, getAuthorHeader());
      return response.data;
    },
    enabled: !!id,
  });
};

// fetch create item
export const useCreateItem = () => {
  return useMutation({
    mutationKey: ["createItem"],
    mutationFn: async (newItem: Item) => {
      const response = await axiosClient.post(`/create`, newItem, getAuthorHeader());
      return response.data;
    },
  });
};

// fetch update item
export const useUpdateItem = (id: string) => {
  return useMutation({
    mutationKey: ["updateItem", id],
    mutationFn: async (newItem: Item) => {
      const response = await axiosClient.put(`/item/${id}`, newItem, getAuthorHeader());
      return response.data;
    },
  });
};

// fetch delete item
export const useDeleteItem = (id: string) => {
  return useMutation({
    mutationKey: ["deleteItem", id],
    mutationFn: async () => {
      const response = await axiosClient.delete(`/item/${id}`, getAuthorHeader());
      return response.data;
    },
  });
};

/**
 * User api
 */

interface Register {
  email: string;
  username: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

// fetch register user
export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (userInfo: Register) => {
      const response = await axiosClient.post(`/register`, userInfo);
      return response.data;
    },
  });
};

// fetch register user
export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (user: Login) => {
      const response = await axiosClient.post(`/login`, user);
      return response.data;
    },
  });
};
