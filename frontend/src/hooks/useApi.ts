import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

// Create axios instance for set default config
const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create interceptor respone for error logging
axiosClient.interceptors.response.use(
  (response) => {
    // Return normal response
    return response;
  },
  (error: AxiosError) => {
    if (!error.response) {
      // Error case when server no response
      console.error("Network Error or Server is unreachable");
      return Promise.reject(error);
    } else {
      // Error case when server response with status code
      const { status } = error.response;
      switch (status) {
        case 400:
          console.error("Bad Request (400):", error.response?.data);
          break;
        case 401:
          console.error("Unauthorized (401):", error.response?.data);
          break;
        case 404:
          console.error("Not Found (404):", error.response?.data);
          break;
        case 422:
          console.error("Unprocessable Entity (422):", error.response?.data);
          break;
        case 500:
          console.error("Internal Server Error (500):", error.response?.data);
          break;
        default:
          console.error(`Error (${status}): An unknown error occurred.`);
          break;
      }
    }
    return Promise.reject(error);
  }
);

// Fucntion get authorization header
const getAuthorHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/**
 * User api
 */

// Define type register form
interface Iregister {
  email: string;
  username: string;
  password: string;
}

// Define type log in form
interface Ilogin {
  email: string;
  password: string;
}

// Fetch register user
export const useRegister = (setStatusError: (status: number | null) => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (userInfo: Iregister) => {
      const response = await axiosClient.post(`/register`, userInfo);
      return response.data;
    },
    // When success => alert and navigate to path "/login"
    onSuccess: () => {
      alert("You have been successfully registered. ✅");
      navigate("/login");
    },
    onError: (error: AxiosError) => {
      // When error => setSttusError using callback for navigate to error pages component
      if (!error.response) {
        setStatusError(0);
      } else {
        const status = error.response.status;
        if (status === 400) {
          alert("Email or Username already exists. ❌");
        } else {
          setStatusError(status);
        }
      }
    },
  });
};

// Fetch register user
export const useLogin = (setStatusError: (status: number | null) => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (user: Ilogin) => {
      const response = await axiosClient.post(`/login`, user);
      return response.data;
    },
    // When success => get token, alert and navigate to path "/items"
    onSuccess: (res) => {
      if (res.token) {
        // save token to local storage
        localStorage.setItem("token", res.token);
      }
      alert("You has been successfully loged in. ✅");
      navigate("/items");
    },
    onError: (error: AxiosError) => {
      // When error => setSttusError using callback for navigate to error pages component
      if (!error.response) {
        setStatusError(0);
      } else {
        const status = error.response.status;
        if (status === 400) {
          alert("Invalid Email or Password. ❌");
        } else {
          setStatusError(status);
        }
      }
    },
  });
};

/**
 * Item api
 */

// Define type form
interface Iitem {
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays?: number;
  isWarranty?: "warranty" | "nearExpire" | "expired";
}

// Fetch get all items
export const useGetItems = (setStatusError: (status: number | null) => void) => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/items`, getAuthorHeader());
        // When success => return items data
        return response.data;
      } catch (error: unknown) {
        // When error => setSttusError using callback for navigate to error pages component
        const axiosError = error as AxiosError;
        if (!axiosError.response) {
          setStatusError(0);
        } else {
          const status = axiosError.response.status;
          setStatusError(status);
        }
        throw axiosError;
      }
    },
  });
};

// fetch get single item
export const useGetItem = (id: string, setStatusError: (status: number | null) => void) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      try {
        const response = await axiosClient.get(`/item/${id}`, getAuthorHeader());
        // When success => return item data
        return response.data;
      } catch (error) {
        // When error => setSttusError using callback for navigate to error pages component
        const axiosError = error as AxiosError;
        if (!axiosError.response) {
          setStatusError(0);
        } else {
          const status = axiosError.response.status;
          setStatusError(status);
        }
        throw axiosError;
      }
    },
    enabled: !!id,
  });
};

// // fetch create item
export const useCreateItem = (setStatusError: (status: number | null) => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["createItem"],
    mutationFn: async (newItem: Iitem) => {
      const response = await axiosClient.post(`/create`, newItem, getAuthorHeader());
      return response.data;
    },
    // When success => alert and navigate to path "/items"
    onSuccess: () => {
      alert("The item has been successfully created. ✅");
      navigate("/items");
    },
    // When error => setSttusError using callback for navigate to error pages component
    onError: (error: AxiosError) => {
      if (!error.response) {
        setStatusError(0);
      } else {
        const status = error.response.status;
        setStatusError(status);
      }
    },
  });
};

// fetch update item
export const useUpdateItem = (id: string, setStatusError: (status: number | null) => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["updateItem", id],
    mutationFn: async (newItem: Iitem) => {
      const response = await axiosClient.put(`/item/${id}`, newItem, getAuthorHeader());
      return response.data;
    },
    // When success => alert and navigate to path "/items"
    onSuccess: () => {
      alert("The item has been successfully updated. ✅");
      navigate("/items");
    },
    // When error => setSttusError using callback for navigate to error pages component
    onError: (error: AxiosError) => {
      const axiosError = error as AxiosError;
      if (!axiosError.response) {
        setStatusError(0);
      } else {
        const status = axiosError.response.status;
        setStatusError(status);
      }
    },
  });
};

// fetch delete item
export const useDeleteItem = (id: string, setStatusError: (status: number | null) => void) => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["deleteItem", id],
    mutationFn: async () => {
      const response = await axiosClient.delete(`/item/${id}`, getAuthorHeader());
      return response.data;
    },
    // When success => alert and navigate to path "/items"
    onSuccess: () => {
      alert("The item has been successfully deleted. ✅");
      navigate("/items");
    },
    // When error => setSttusError using callback for navigate to error pages component
    onError: (error: AxiosError) => {
      const axiosError = error as AxiosError;
      if (!axiosError.response) {
        setStatusError(0);
      } else {
        const status = axiosError.response.status;
        setStatusError(status);
      }
    },
  });
};
