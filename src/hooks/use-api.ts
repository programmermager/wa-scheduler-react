import { useState, useCallback } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface RequestOptions<T = unknown> {
  showErrorToast?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface UseApiResult<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
  request: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => Promise<void>;
}

function useApi<T>(): UseApiResult<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { authorization: `Bearer ${token}` }),
  };

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: headers,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        toast.error("Session expired, please login again");
      }
      return Promise.reject(error);
    }
  );

  const request = useCallback(
    async (config: AxiosRequestConfig, options: RequestOptions<T> = {}) => {
      const { showErrorToast = false, onSuccess, onError } = options;

      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await axiosInstance(config);
        setData(response.data);
        onSuccess?.(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const errorMsg = err.response?.data?.message || err.message;
          setError(errorMsg);
          onError?.(errorMsg);
          if (showErrorToast) toast.error(errorMsg);
        } else {
          const errorMsg = "Unexpected error occurred";
          setError(errorMsg);
          onError?.(errorMsg);
          if (showErrorToast) toast.error(errorMsg);
        }
      } finally {
        setLoading(false);
      }
    },
    [axiosInstance]
  );

  return { loading, data, error, request };
}

export default useApi;
