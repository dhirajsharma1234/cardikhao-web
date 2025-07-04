import { useEffect, useState } from 'react';

const useSearch = (inputRef) => {
  const placeholderTexts = [
    'Search for Maruti, Hyundai, Tata...',
    'Find cars under ₹5 Lakhs',
    'Search by model: Swift, Baleno...',
    'Looking for SUV, Sedan or Hatchback?',
    'Search by city: Delhi, Mumbai...',
    'Find certified pre-owned cars',
  ];
  const [placeholder, setPlaceholder] = useState(placeholderTexts[0]);

  useEffect(() => {
    const changePlaceholder = () => {
      setPlaceholder((prev) => {
        const currentIndex = placeholderTexts.indexOf(prev);
        return placeholderTexts[(currentIndex + 1) % placeholderTexts.length];
      });
    };

    const interval = setInterval(changePlaceholder, 3000);
    return () => clearInterval(interval);
  }, [placeholderTexts]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && inputRef.current) {
      console.log('Searching for:', inputRef.current.value); // Replace with actual search logic
    }
  };

  return { placeholder, handleSearch };
};

export default useSearch;