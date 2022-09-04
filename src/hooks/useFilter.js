import React from "react";
import usePagination from "./usePagination";

export default function useFilter(filterData) {
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const { handleSetPage } = usePagination();

  const handleToggleFilterValue = (filterKey, valueId) => {
    handleSetPage(1);
    // Does the main filter ID already exist in selected filters?
    if (selectedFilters.filter((sf) => sf.key === filterKey).length > 0) {
      // Get index of the target filter
      let targetFilterIndex = selectedFilters.findIndex(
        (sf) => sf.key === filterKey
      );

      // Get target filter
      let targetFilter = selectedFilters[targetFilterIndex];

      // Check if valueId exists in filter object

      if (targetFilter.values.filter((i) => i === valueId).length > 0) {
        // Check if filter values length is > 0
        if (targetFilter.values.length === 1) {
          // Delete entire filter if it has no selected values
          return setSelectedFilters((oldValue) => [
            ...oldValue.filter((i) => i.key !== filterKey),
          ]);
        }
        // Replace old filter with the new updated one
        return setSelectedFilters((oldValue) => [
          ...oldValue.filter((i) => i.key !== filterKey),
          {
            ...targetFilter,
            values: targetFilter.values.filter((i) => i !== valueId),
          },
        ]);
      }

      // Add new valueId to target filter
      targetFilter = {
        ...targetFilter,
        values: [...targetFilter.values, valueId],
      };

      // Replace old filter with the new updated one
      return setSelectedFilters((oldValue) => [
        ...oldValue.filter((i) => i.key !== filterKey),
        targetFilter,
      ]);
    }
    // Replace old filter with the new updated one
    setSelectedFilters((oldValue) => [
      ...oldValue,
      { key: filterKey, values: [valueId] },
    ]);
  };

  /* This function returns all filters (Original case) */
  const getAllFilters = () => {
    return filterData;
  };

  /* This function returns only selected filter values from the original filters array (Without preserving original sort) */
  const getSelectedFilters = () => {
    return (
      // Get filters objects where their IDs are equal to the selected filters IDs
      filterData
        .filter((el) => selectedFilters.some((sf) => sf.key === el.key))
        // Mapping through each filter values array
        .map((el) => {
          // This array will be used to order the values array of the object
          let selectedValues = selectedFilters.filter(
            (sf) => sf.key === el.key
          )[0].values;

          // Return only selected values from the filter object values array
          let newValues = el.values.filter((elValue) =>
            selectedFilters
              .filter((sf) => sf.key === el.key)[0]
              .values.includes(elValue.id)
          );
          // Sort selected values from the object array depending on the selected order
          let sortedValues = newValues.sort(
            (a, b) =>
              selectedValues.indexOf(a.id) - selectedValues.indexOf(b.id)
          );
          return {
            ...el,
            values: sortedValues,
          };
        })
    );
  };

  const reset = async () => {
    setSelectedFilters([]);
  };

  return {
    selectedFilters,
    getSelectedFilters,
    getAllFilters,
    handleToggleFilterValue,
    reset,
  };
}
