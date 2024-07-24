import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../redux/filterSlice";
import { Input } from "@chakra-ui/react";

const Filter = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Input
      type="text"
      value={filter}
      onChange={handleFilterChange}
      placeholder="Search by name"
      mt="4"
      mb="4"
    />
  );
};

export default Filter;
