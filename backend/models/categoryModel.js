import mongoose from "mongoose";

// Define the subcategory schema
const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Define the category schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // The category name
  subcategories: [SubcategorySchema], // Array of subcategories
});

// Create the Category model
const Category = mongoose.model("Category", CategorySchema);

export default Category;
