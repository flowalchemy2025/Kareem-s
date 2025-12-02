import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export const useFetch = (endpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(endpoint).then((res) => setData(res.data));
  }, [endpoint]);

  return data;
};
