import { useState, useEffect } from "react";
import { TextField, Autocomplete, Button } from "@mui/material";
import axios from "axios";

import { Box, Typography } from "@mui/material";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]); // State for subcategories
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Selected subcategory
  const [message, setMessage] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://millenniumchallenge.onrender.com/api/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch subcategories when a category is selected
  const handleCategoryChange = (event, value) => {
    setSelectedCategory(value);
    const selectedCat = categories.find((cat) => cat.name === value);

    if (selectedCat) {
      setSubcategories(selectedCat.subcategories.map((sub) => sub.name)); // Update subcategories
    } else {
      setSubcategories([]); // Clear subcategories if no category is selected
    }
  };

  // Add new category or subcategory
  const handleAddCategoryOrSubcategory = async () => {
    if (!selectedCategory) return;

    const existingCategory = categories.find((cat) => cat.name === selectedCategory);

    if (!existingCategory) {
      // Add new category if it doesn't exist
      try {
        const response = await axios.post(
          "https://millenniumchallenge.onrender.com/api/categories/add",
          {
            name: selectedCategory,
            subcategories: [],
          }
        );
        setMessage(`Added new category: ${selectedCategory}`);
        fetchCategories();
      } catch (err) {
        setMessage("Error adding new category.");
        console.error(err);
      }
    } else if (selectedSubcategory) {
      // Add subcategory to the existing category
      try {
        const response = await axios.post(
          "https://millenniumchallenge.onrender.com/api/categories/add-subcategory",
          {
            categoryName: selectedCategory,
            subcategoryName: selectedSubcategory,
          }
        );
        setMessage(`Added subcategory: ${selectedSubcategory} to category: ${selectedCategory}`);
        fetchCategories();
      } catch (err) {
        setMessage("Error adding subcategory.");
        console.error(err);
      }
    } else {
      setMessage("Please select or add a subcategory name.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Survey Categories
        </Typography>
        <div style={{ padding: "20px", display: "flex" }}>
          {/* Category Dropdown with Autocomplete */}
          <Autocomplete
            freeSolo
            options={categories.map((category) => category.name)}
            onChange={handleCategoryChange}
            onInputChange={(e, value) => setSelectedCategory(value)}
            renderInput={(params) => (
              <TextField {...params} label="Select or Add Category" variant="outlined" />
            )}
            style={{ marginRight: "20px", width: "300px" }}
          />

          {/* Subcategory Dropdown with Autocomplete */}
          <Autocomplete
            freeSolo
            options={subcategories} // Display subcategories dynamically
            onChange={(e, value) => setSelectedSubcategory(value)}
            onInputChange={(e, value) => setSelectedSubcategory(value)}
            renderInput={(params) => (
              <TextField {...params} label="Select or Add Subcategory" variant="outlined" />
            )}
            style={{ width: "400px" }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCategoryOrSubcategory}
            style={{ color: "white", ml: 2 }}
          >
            Add Category/Subcategory
          </Button>
        </div>
        <br />
        {message && <p>{message}</p>}
      </Box>
      <Footer />
    </DashboardLayout>
  );
};

export default CategoryForm;
