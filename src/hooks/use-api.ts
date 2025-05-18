// hooks/useApi.ts
import { useState, useCallback } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

interface UseApiResult<T> {
  loading: boolean;
  data: T | null;
  error: string | null;
  request: (config: AxiosRequestConfig) => Promise<void>;
}

function useApi<T = unknown>(): UseApiResult<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (config: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios(config);
      setData(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, data, error, request };
}

export default useApi;
