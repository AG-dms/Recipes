import React from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  const search = useLocation();
  return React.memo(() => new URLSearchParams(search), [search]);
};

export default useQuery;

// in component:

// const query = useQuery()
// const param = query.get(paramName)
