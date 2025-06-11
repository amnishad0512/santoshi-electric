import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Only set up the timer if the value has changed
    if (value !== debouncedValue) {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, delay, debouncedValue]);

  return debouncedValue;
}

export default useDebounce; 