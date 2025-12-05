export interface DishType {
  id?: string;          // random unique id
  name: string;         // dish name
  price: string;        // price
  category: string;     // category name
  is_veg?: number;      // 1 = veg, 0 = non-veg
  description?: string; // dish description
  image?: string;       // cloudinary url
  rowNumber?: number;   // used for updating specific sheet row
}
