import { useState } from "react";

export const useAuth = () => {
  const [admin, setAdmin] = useState(null);
  return { admin, setAdmin };
};
