import { useState } from "react";
import { Search, X } from "lucide-react";

/**
 * SearchBar Component
 * Reusable search input component
 */

const SearchBar = ({
  placeholder = "Search events...",
  onSearch,
  onChange,
  debounceMs = 300,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Call onChange immediately if provided
    onChange?.(value);

    // Set new debounce timer for onSearch
    if (onSearch) {
      const timer = setTimeout(() => {
        
        onSearch(value);
      }, debounceMs);
      setDebounceTimer(timer);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onChange?.("");
    onSearch?.("");
    
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Clear debounce timer and search immediately
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      onSearch?.(searchTerm);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="absolute top-full mt-1 left-0 right-0">
          <p className="text-xs text-neutral-500">
            Press Enter to search or wait {debounceMs}ms for auto-search
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
