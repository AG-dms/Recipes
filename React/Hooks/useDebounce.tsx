import { Region } from "@utils/common";
import { useEffect, useState } from "react";

const useDebounce = (value: type, delay: number): { debounceValue: type; isDebouncing: boolean } => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isDebouncing, setDebouncing] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setDebouncing(false);
    }, delay);
    return () => {
      setDebouncing(true);
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, isDebouncing };
};

/*
in component:
useDebounce(value, delay)
*/
