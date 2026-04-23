import { useState, useMemo } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: any;
}

export function useDashboardNav(initialNav: string, navItems: NavItem[]) {
  const [activeNav, setActiveNav] = useState(initialNav);
  const currentTitle = useMemo(
    () => navItems.find((i) => i.id === activeNav)?.label || 'Dashboard',
    [activeNav, navItems]
  );

  return {
    activeNav,
    setActiveNav,
    currentTitle,
  };
}

export function useSearch(initialValue: string = '') {
  const [searchValue, setSearchValue] = useState(initialValue);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return {
    searchValue,
    setSearchValue,
    handleSearch,
  };
}

export function useFilter(filterCategories: string[]) {
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>(
    filterCategories.reduce((acc, cat) => ({ ...acc, [cat]: false }), {})
  );

  const toggleFilter = (category: string) => {
    setActiveFilters((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const resetFilters = () => {
    setActiveFilters(
      filterCategories.reduce((acc, cat) => ({ ...acc, [cat]: false }), {})
    );
  };

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length;

  return {
    activeFilters,
    toggleFilter,
    resetFilters,
    activeFilterCount,
  };
}
