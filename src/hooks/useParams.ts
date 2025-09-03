import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Get param by key
  const getParam = useCallback((key) => searchParams.get(key), [searchParams]);

  // ✅ Set or update param
  const setParam = useCallback(
    (key, value) => {
      const newParams = new URLSearchParams(searchParams);
      if (value === null || value === undefined) {
        newParams.delete(key); // remove if null
      } else {
        newParams.set(key, value);
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  // ✅ Get all params as object
  const getAll = useCallback(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);

  return { getParam, setParam, getAll };
}
