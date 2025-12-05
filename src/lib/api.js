import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// GET all dishes
export const getAllDishes = async () => {
  const res = await API.get("/dishes");
  return res.data;
};

// ADD a dish
export const addDish = async (dish) => {
  const res = await API.post("/dishes", dish);
  return res.data;
};

// EDIT a dish
export const editDish = async (rowNumber, updatedData) => {
  const res = await API.put(`/dishes/${rowNumber}`, updatedData);
  return res.data;
};

// DELETE a dish
export const deleteDish = async (rowNumber) => {
  const res = await API.delete(`/dishes/${rowNumber}`);
  return res.data;
};
