import { useState, useEffect, useCallback } from 'react';
import useDebounce from './useDebounce';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Increase debounce delay to make it more noticeable
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setResults(data.products);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only search when we have a debounced value
    if (debouncedSearchTerm !== searchTerm) {
      searchProducts(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, searchProducts, searchTerm]);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setResults([]);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setResults([]);
      setIsOpen(false);
    } else {
      setIsLoading(true);
    }
  }, []);

  return {
    searchTerm,
    setSearchTerm: handleSearchChange,
    results,
    isLoading,
    isOpen,
    closeSearch
  };
}

export default useSearch; 