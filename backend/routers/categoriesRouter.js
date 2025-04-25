import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import Survey from "../models/surveyModel.js";
import CategoricalQuestions from "../models/categoricalQ.js";

import fs from "fs";
import path from "path";

const categoriesRouter = express.Router();

// POST: Add a new category
categoriesRouter.post(
  "/add",
  expressAsyncHandler(async (req, res) => {
    const { name, subcategories } = req.body;

    try {
      // Check if the category already exists
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).send("Category already exists.");
      }

      // Create a new category document
      const newCategory = new Category({
        name,
        subcategories: subcategories.map((subcategory) => ({ name: subcategory })),
      });

      // Save the new category
      await newCategory.save();
      res.status(201).send({ message: "Category added successfully", category: newCategory });
    } catch (err) {
      console.error("Error adding category:", err);
      res.status(500).send("An error occurred while adding the category.");
    }
  })
);

// POST: Add a new subcategory to an existing category
categoriesRouter.post(
  "/add-subcategory",
  expressAsyncHandler(async (req, res) => {
    const { categoryName, subcategoryName } = req.body;

    try {
      // Find the category by name
      const category = await Category.findOne({ name: categoryName });
      if (!category) {
        return res.status(404).send("Category not found.");
      }

      // Check if the subcategory already exists
      const existingSubcategory = category.subcategories.find(
        (subcategory) => subcategory.name === subcategoryName
      );
      if (existingSubcategory) {
        return res.status(400).send("Subcategory already exists.");
      }

      // Add the new subcategory to the subcategories array
      category.subcategories.push({ name: subcategoryName });

      // Save the updated category
      await category.save();
      res.status(200).send({ message: "Subcategory added successfully", category });
    } catch (err) {
      console.error("Error adding subcategory:", err);
      res.status(500).send("An error occurred while adding the subcategory.");
    }
  })
);

// GET: Fetch all categories and their subcategories
categoriesRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const categories = await Category.find({});
      res.status(200).send(categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
      res.status(500).send("An error occurred while fetching categories.");
    }
  })
);

categoriesRouter.post(
  "/save-all",
  expressAsyncHandler(async (req, res) => {
    const categoriesData = req.body;

    try {
      for (const data of categoriesData) {
        const { surveyId, questionId, category, subcategory } = data;
        await Survey.updateOne(
          { id: surveyId, "pages.questions.id": questionId },
          {
            $set: {
              "pages.$[].questions.$[q].category": category,
              "pages.$[].questions.$[q].subcategory": subcategory,
            },
          },
          { arrayFilters: [{ "q.id": questionId }] }
        );
      }

      res.status(200).send({ message: "Categories and subcategories saved successfully." });
    } catch (err) {
      console.error("Error saving categories:", err);
      res.status(500).send("An error occurred while saving categories.");
    }
  })
);

categoriesRouter.post(
  "/:id/assign-auto",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    try {
      const filePath = path.resolve("questions_info.json");
      const questionsInfo = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const survey = await Survey.findOne({ id: surveyId });
      if (!survey) {
        return res.status(404).send({ message: "Survey not found." });
      }

      let modified = false;
      let updatedQuestions = [];

      for (const page of survey.pages) {
        for (const question of page.questions) {
          const headingText = question.headings?.[0]?.heading?.trim();

          if (!headingText) continue;

          const match = questionsInfo.find((q) => q.heading.trim() === headingText);

          if (match) {
            question.category = match.category || "";
            question.subcategory = match.subcategory || "";
            updatedQuestions.push(headingText);
            modified = true;
          }
        }
      }

      if (modified) {
        await survey.save();
        res.status(200).send({
          message: `Categorías asignadas automáticamente a la encuesta ${surveyId}.`,
          updated: updatedQuestions.length,
          questions: updatedQuestions,
        });
      } else {
        res.status(200).send({
          message: `No se encontraron coincidencias para actualizar en la encuesta ${surveyId}.`,
        });
      }
    } catch (error) {
      console.error("Error al asignar categorías:", error);
      res.status(500).send("Error al procesar la asignación automática.");
    }
  })
);

categoriesRouter.get(
  "/filter-questions/:id",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    try {
      const existingSurvey = await CategoricalQuestions.findOne({ surveyId });

      res.send(existingSurvey);
    } catch (err) {
      console.error("Error saving categories:", err);
      res.status(500).send("An error occurred while saving categories.");
    }
  })
);

const saveCategoricalQuestions = async (surveyData) => {
  try {
    // Create a new survey document
    const survey = new CategoricalQuestions(surveyData);
    // Save to the database
    await survey.save();
    console.log("Categorical questions survey data saved successfully");
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error for unique surveyId
      console.log("Survey with this ID already exists");
    } else {
      console.error("Error saving categorical questions survey data:", error);
    }
  }
};

const addLabelsToQuestions = (surveyData) => {
  // Define the labels for each question heading
  const labelMappings = {
    "¿Cuál es tu género?": "gender",
    "¿En cuál grupo de edad te encuentra?": "age_group",
    "¿En qué rango de edad te encuentras?": "age_group",
    "¿Cuál es el nivel de educación más alto que obtuviste?": "education_level",
    "¿Cuál es tu nivel de formación académica más alto?": "education_level",
    "¿Cuál es tu estado civil?": "marital_status",
    "¿En qué departamento laboras?": "department",
    "¿Cuántos hijos tienes?": "number_of_children",
    "Aproximadamente, ¿cuánto tiempo tienes trabajando en esta empresa?": "permanence",
    "Tu puesto está clasificado como": "job_position_type",
    "¿En qué sucursal laboras?": "work_location",
    "¿En qué rango de edad se encuentran tus hijos?": "children_age_range",
    "¿Cuál es tu situación habitacional actual?": "housing_situation",
    "¿Eres el principal proveedor económico en tu hogar?": "primary_earner",
    "¿Cuál es tu modalidad principal de trabajo?": "work_mode",
    "¿En qué turno de trabajo laboras principalmente?": "work_shift",
    "¿Cuántas horas trabajas regularmente por semana?": "weekly_work_hours",
    "¿En qué rango salarial mensual te encuentras?": "salary_range",
    "¿Cuál es tu principal medio de transporte al trabajo?": "transportation_mode",
    "¿En qué departamento o área de trabajo desempeñas tus funciones?": "work_department",
  };

  // Add labels to each question
  surveyData.categoricalQuestions = surveyData.categoricalQuestions.map((question) => {
    return {
      ...question,
      label: labelMappings[question.heading] || "unknown", // Default to "unknown" if no label is found
    };
  });

  return surveyData;
};

categoriesRouter.get(
  "/categorical-questions/:id",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    // const responses = await ResponseDetails.find({ survey_id: surveyId });
    const surveyDetails = await Survey.findOne({ id: surveyId });
    const categoricalQuestions = [];

    // List of patterns indicating binary or non-categorical responses
    const excludeChoicePatterns = [
      "de acuerdo",
      "probable",
      "satisfecho",
      "comprometida",
      "motivado",
      "mayor parte del tiempo",
      "mitad del tiempo",
      "pocas veces",
      "nunca",
      "excelente",
      "bueno",
      "regular",
      "deficiente",
      "siempre",
      "frecuentemente",
      "poco",
      "nada",
      "suficiente",
      "casi",
      "caminando",
    ];

    // Binary choices or conditional responses that imply uncertainty
    const binaryChoices = ["si", "sí", "no", "una parte", "no sé qué significa"];

    // Function to identify purely categorical questions, excluding binary or conditional responses
    function isPureCategorical(choices) {
      const choicesLower = choices.map((choice) => choice.toLowerCase());

      const hasBinaryResponses = choicesLower.some(
        (choice) =>
          binaryChoices.includes(choice) || choice.includes("una parte") || choice.includes("no sé")
      );

      const hasExclusionPattern = choicesLower.some((choice) =>
        excludeChoicePatterns.some((pattern) => choice.includes(pattern))
      );

      return !hasBinaryResponses && !hasExclusionPattern;
    }

    surveyDetails.pages.forEach((page) => {
      page.questions.forEach((question) => {
        if (question.answers && question.answers.choices && question.answers.choices.length > 0) {
          const choicesText = question.answers.choices.map((choice) => choice.text);

          if (isPureCategorical(choicesText)) {
            categoricalQuestions.push({
              questionId: question.id,
              heading: question.headings[0].heading,
              choices: choicesText,
            });
          }
        }
      });
    });

    // Wrap all categorical questions under the survey ID
    const output = {
      surveyId: surveyId,
      categoricalQuestions: categoricalQuestions,
    };

    const labeledCategoricalQuestions = await addLabelsToQuestions(output);
    await saveCategoricalQuestions(labeledCategoricalQuestions);

    res.send(labeledCategoricalQuestions);
  })
);

export default categoriesRouter;
