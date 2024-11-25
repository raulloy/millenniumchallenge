/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import apiURL from "utils";

const CategoryForm = ({
  selectedCategories,
  setSelectedCategories,
  selectedSubcategories,
  setSelectedSubcategories,
  surveyId,
  questionId,
  initialCategory,
  initialSubcategory,
}) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "");
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory || "");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Set subcategories if initialCategory is provided
    if (initialCategory) {
      const selectedCat = categories.find((cat) => cat.name === initialCategory);
      setSubcategories(selectedCat ? selectedCat.subcategories.map((sub) => sub.name) : []);
    }
  }, [initialCategory, categories]);

  const handleCategoryChange = (event, value) => {
    setSelectedCategory(value);
    const selectedCat = categories.find((cat) => cat.name === value);
    setSubcategories(selectedCat ? selectedCat.subcategories.map((sub) => sub.name) : []);

    // Update global category state for the specific question
    setSelectedCategories((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Clear the subcategory if the category changes
    setSelectedSubcategory("");
    setSelectedSubcategories((prev) => ({
      ...prev,
      [questionId]: "",
    }));
  };

  const handleSubcategoryChange = (event, value) => {
    setSelectedSubcategory(value);

    // Update global subcategory state for the specific question
    setSelectedSubcategories((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Autocomplete
        options={categories.map((category) => category.name)}
        value={selectedCategory}
        onChange={handleCategoryChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecciona una Categoría"
            variant="outlined"
            fullWidth
            style={{ width: "400px" }}
          />
        )}
      />
      <Autocomplete
        options={subcategories}
        value={selectedSubcategory}
        onChange={handleSubcategoryChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecciona una Subcategoría"
            variant="outlined"
            fullWidth
            style={{ width: "400px" }}
          />
        )}
      />
    </div>
  );
};

export default CategoryForm;
